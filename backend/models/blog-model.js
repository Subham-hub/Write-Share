import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  image: {
    id: { type: String, required: true },
    secure_url: { type: String, required: true },
  },
  uid: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
})

export default mongoose.model('Blog', blogSchema)
