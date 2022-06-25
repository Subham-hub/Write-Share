import cloudinary from 'cloudinary'
import { validationResult } from 'express-validator'

import Blog from '../models/blog-model.js'
import HttpError from '../utils/http-error.js'
import User from '../models/user-model.js'
import { messages } from '../utils/error-messages.js'

export const getBlogs = async (req, res, next) => {
  let blogs
  try {
    blogs = await Blog.find()
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }
  res.json(blogs)
}

export const addBlog = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422))

  const { title, description, author, uid } = req.body

  let file = req.files.image
  let imageUploadResult
  try {
    imageUploadResult = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      name: 'blog_img',
      folder: process.env.CLOUDINARY_FOLDER + 'blog_img',
    })
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }

  const newBlog = new Blog({
    title,
    description,
    author,
    uid,
    image: {
      id: imageUploadResult.public_id,
      secure_url: imageUploadResult.secure_url,
    },
  })

  let user
  try {
    user = await User.findById(newBlog.uid)
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }

  if (!user)
    return next(new HttpError('Could not find user for provided id.', 404))

  try {
    user.blogs.push(newBlog._id)
    await newBlog.save()
    await user.save()
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }

  res.status(201).json({ success: true, blog: newBlog })
}

export const editBLog = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422))

  const { title, description } = req.body
  const bid = req.params.bid

  let blog
  try {
    blog = await Blog.findById(bid)
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }
  blog.title = title
  blog.description = description

  try {
    await blog.save()
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }
  res.status(201).json({ success: true, blog })
}

export const deleteBlog = async (req, res, next) => {
  const bid = req.params.bid

  let blog
  let user
  try {
    blog = await Blog.findById(bid)
    user = await User.findById(blog.uid)
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }

  if (!blog) return next(new HttpError('No blogs with that id found', 404))
  if (!user) return next(new HttpError('No blogs with that id found', 404))

  try {
    user.blogs.pull(bid)
    await cloudinary.v2.uploader.destroy(blog.image.id)
    await blog.delete()
    await user.save()
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }
  res.json({ message: 'Deleted' })
}
