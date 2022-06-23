import express from 'express'
import { check } from 'express-validator'

import { isLoggedIn } from '../middleware/user-middleware.js'

import {
  getUserProfile,
  getUsers,
  login,
  logout,
  signup,
  updateProfile,
  updateUser,
} from '../controllers/users-controllers.js'

const router = express.Router()

router.get('/', isLoggedIn, getUsers)
router.get('/user-profile/:uid', isLoggedIn, getUserProfile)

router.post(
  '/signup',
  [
    check('firstname').not().isEmpty(),
    check('lastname').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  signup,
)

router.post('/update_profile', updateProfile)

router.post(
  '/login',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  login,
)

router.get('/logout', logout)

router.patch(
  '/update-user/:uid',
  [
    check('name').not().isEmpty(),
    check('field').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
  ],
  isLoggedIn,
  updateUser,
)

export default router
