import { validationResult } from 'express-validator'
import cloudinary from 'cloudinary'

import Blog from '../models/blog-model.js'
import HttpError from '../utils/http-error.js'
import User from '../models/user-model.js'

export const getBlogs = async (req, res, next) => {
  let blogs
  try {
    blogs = await Blog.find()
  } catch (e) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }
  res.json({
    blogs: blogs.map((blog) => blog.toObject({ getters: true })),
  })
}

export const getBlogsByUserId = async (req, res, next) => {
  const uid = req.params.uid
  let user
  try {
    user = await User.findById(uid)
  } catch (e) {
    return next(new HttpError('Requst failed, please try again', 500))
  }
  if (!user) {
    return next(new HttpError('User do not exists', 500))
  }
  let blogs
  try {
    blogs = await Blog.find({ uid })
  } catch (e) {
    return next(new HttpError('Cannot fetch user, please try again', 500))
  }
  if (blogs.length === 0) {
    return next(new HttpError('No Blogs found with that id', 500))
  }

  res.json({ message: 'Found', blogs })
}

export const addBlog = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    )
  }

  const { title, description, name, uid } = req.body

  let file = req.files.image
  let imageUploadResult
  try {
    imageUploadResult = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      name: 'hey',
      folder: process.env.CLOUDINARY_DEV_FOLDER + 'blog_img',
    })
  } catch (error) {
    return next(
      new HttpError('Seems like a server error, please try again'),
      500,
    )
  }

  const newBlog = new Blog({
    title,
    description,
    name,
    uid,
    image: imageUploadResult.secure_url,
  })

  let user
  try {
    user = await User.findById(newBlog.uid)
    if (!user)
      return next(new HttpError('Could not find user for provided id.', 404))
  } catch (err) {
    return next(new HttpError('Request failed, please try again', 500))
  }

  try {
    await newBlog.save()
    user.blogs.push(newBlog._id)
    await user.save()
  } catch (e) {
    console.log(e)
    return next(
      new HttpError('Something went wrong, Please try again later', 500),
    )
  }

  res.status(201).json({ message: 'Added', blog: newBlog })
}

export const editBLog = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    )
  }

  const { title, description } = req.body
  const bid = req.params.bid

  let blog
  try {
    blog = await Blog.findById(bid)
  } catch (e) {
    return next(
      new HttpError('Something went wrong, could not update blog.', 500),
    )
  }
  blog.title = title
  blog.description = description

  try {
    await blog.save()
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update blog.', 500),
    )
  }
  res
    .status(201)
    .json({ message: 'updated', blog: blog.toObject({ getters: true }) })
}

export const deleteBlog = async (req, res, next) => {
  const bid = req.params.bid

  let blog

  try {
    blog = await Blog.findById(bid).populate('uid')
  } catch (e) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }

  if (!blog) {
    return next(new HttpError('No blogs with that id found', 401))
  }
  try {
    await blog.deleteOne({ _id: bid }).catch(() => {
      return next(new HttpError('Cannot delete blog, please try again', 500))
    })
    await User.updateOne({ _id: blog.uid }, { $pull: { blogs: bid } }).catch(
      () => {
        return next(new HttpError('Cannot delete blog, please try again', 500))
      },
    )
  } catch (e) {
    return next(new HttpError('Cannot delete blog, please try again', 500))
  }
  res.json({ message: 'Deleted' })
}
