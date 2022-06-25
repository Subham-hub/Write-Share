import express from 'express'
import { check } from 'express-validator'

import { isLoggedIn } from '../middleware/user-middleware.js'

import {
  addBlog,
  deleteBlog,
  editBLog,
  getBlogs,
} from '../controllers/blog-controllers.js'

const router = express.Router()

router.get('/', getBlogs)

router.post(
  '/add_blog',
  [check('title').not().isEmpty(), check('description').isLength({ min: 10 })],
  isLoggedIn,
  addBlog,
)

router.patch(
  '/edit/:bid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 10 })],
  isLoggedIn,
  editBLog,
)

router.delete('/delete_blog/:bid', isLoggedIn, deleteBlog)

export default router
