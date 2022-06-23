import jwt from 'jsonwebtoken'
import HttpError from '../utils/http-error.js'

export const isLoggedIn = (req, res, next) => {
  if (!req.header('Authorization') && !req.cookies.token) {
    return next(new HttpError('No token found', 403))
  }
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header('Authorization').replace('Bearer ', '')

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
  } catch (e) {
    return next(new HttpError('You are not authorised to do this!'), 401)
  }
  return next()
}

export const customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new HttpError('You are not allowed for this resource', 402))
    }
    next()
  }
}
