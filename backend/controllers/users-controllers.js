import cloudinary from "cloudinary";
import { validationResult } from "express-validator";

import HttpError from "../utils/http-error.js";
import User from "../models/user-model.js";
import Blogs from "../models/blog-model.js";
import cookieToken from "../utils/cookieToken.js";
import { messages } from "../utils/error-messages.js";

export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
  if (users.length === 0) new HttpError(messages.notFound, 404);
  res.json(users);
};

export const getUserById = async (req, res, next) => {
  const uid = req.params.uid;
  let user;
  try {
    user = await User.findById(uid);
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
  if (!user) return next(new HttpError(messages.inputError, 404));

  user.password = undefined;
  res.status(200).json(user);
};

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return next(
        new HttpError("User already exists, please login instead", 422)
      );
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  let file = req.files.avatar;
  let avatarUploadResult;
  try {
    avatarUploadResult = await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        name: "avatar",
        folder: process.env.CLOUDINARY_FOLDER + "avatar",
      }
    );
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  const newUser = await User.create({
    username,
    email,
    password,
    avatar: {
      id: avatarUploadResult.public_id,
      secure_url: avatarUploadResult.secure_url,
    },
  });

  cookieToken(newUser, res);
};

export const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
    if (!user)
      return next(
        new HttpError("Email don't exists, please signup instead", 404)
      );
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) return next(new HttpError("Wrong password", 422));

  cookieToken(user, res);
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logout success" });
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
};

export const updateProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const uid = req.params.uid;
  if (!uid) return next(new HttpError(messages.notFound, 422));
  const { username, email } = req.body;

  try {
    const user = await User.findById(uid);
    const blogs = await Blogs.find();
    if (!user || blogs.length === 0)
      return next(new HttpError(messages.notFound, 404));

    user.username = username;
    user.email = email;
    for (let i = 0; i < user.blogs.length; i++) {
      const finderFn = (b) => b._id.toString() === user.blogs[i].toString();
      const blogObj = blogs.find(finderFn);
      const index = blogs.indexOf(blogObj);
      blogObj.author = username;
      await blogs[index].save();
    }
    await user.save();
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  res.json({ success: true });
};

export const updateProfilePic = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { uid, flag } = req.body;
  let user;
  try {
    user = await User.findById(uid);
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
  if (!user) return next(new HttpError(messages.notFound, 404));

  switch (flag) {
    case "CHANGE_AVATAR":
      let file = req.files.newAvatar;
      let avatarUploadResult;
      try {
        if (user.avatar.id !== null)
          await cloudinary.v2.uploader.destroy(user.avatar.id);
        avatarUploadResult = await cloudinary.v2.uploader.upload(
          file.tempFilePath,
          {
            name: "avatar",
            folder: process.env.CLOUDINARY_FOLDER + "avatar",
          }
        );
        user.avatar.id = avatarUploadResult.public_id;
        user.avatar.secure_url = avatarUploadResult.secure_url;
        await user.save();
      } catch (e) {
        return next(new HttpError(messages.serverError, 500));
      }
      res.status(200).json({ success: true, user });
      break;
    case "REMOVE_AVATAR":
      if (user.avatar.id === null)
        return next(new HttpError("Pic is already being removed", 401));
      try {
        await cloudinary.v2.uploader.destroy(user.avatar.id);
        user.avatar.id = null;
        user.avatar.secure_url = null;
        await user.save();
      } catch (e) {
        return next(new HttpError(messages.serverError, 500));
      }
      res.status(200).json({ success: true, user });
      break;
    default:
      return next(new HttpError("Wrong flag value", 403));
  }
};
