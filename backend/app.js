import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

import userRoutes from './routes/users-route.js'
import blogRoutes from './routes/blogs-route.js'
import HttpError from './utils/http-error.js'

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload({ useTempFiles: true, tempFileDir: './temp' }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS',
  )
  next()
})

app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)

app.use(() => {
  const error = new HttpError('Could not find this route.', 404)
  throw error
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred!' })
})

export default app
