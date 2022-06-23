import express from 'express'
import { check } from 'express-validator'

import { isLoggedIn } from '../middleware/user-middleware.js'

import {
  addBlog,
  deleteBlog,
  editBLog,
  getBlogs,
  getBlogsByUserId,
} from '../controllers/blog-controllers.js'

const router = express.Router()

router.get('/', getBlogs)

router.get('/:uid', isLoggedIn, getBlogsByUserId)
//add-blog
router.post(
  '/add-blog',
  [check('title').not().isEmpty(), check('description').isLength({ min: 10 })],
  isLoggedIn,
  addBlog,
)
//edit-blog
router.patch(
  '/edit/:bid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 10 })],
  isLoggedIn,
  editBLog,
)

router.delete('/delete-blog/:bid', isLoggedIn, deleteBlog)

export default router
