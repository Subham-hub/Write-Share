import app from './app.js'
import 'dotenv/config'
import connectWithDb from './config/db.js'
import cloudinary from 'cloudinary'

const {
  PORT,
  CLOUDINARY_NAME: cloud_name,
  CLOUDINARY_API_KEY: api_key,
  CLOUDINARY_API_SECRET: api_secret,
} = process.env

connectWithDb()
cloudinary.config({ cloud_name, api_key, api_secret })
app.listen(PORT, () => console.log(`Server is up at ${PORT}`))
