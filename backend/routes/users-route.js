import express from "express";
import { check } from "express-validator";

import { isLoggedIn } from "../middleware/user-middleware.js";

import {
  getUserById,
  getUsers,
  login,
  logout,
  signup,
  updateProfile,
  updateProfilePic,
} from "../controllers/users-controllers.js";

const router = express.Router();

router.get("/", isLoggedIn, getUsers);
router.get("/get_user/:uid", isLoggedIn, getUserById);

router.post(
  "/signup",
  [
    check("username").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  login
);

router.get("/logout", isLoggedIn, logout);

router.patch(
  "/update_profile/:uid",
  isLoggedIn,
  [check("username").notEmpty(), check("email").normalizeEmail().isEmail()],
  updateProfile
);

router.patch(
  "/update_pic",
  isLoggedIn,
  [check("uid").notEmpty(), check("flag").notEmpty()],
  updateProfilePic
);

export default router;
