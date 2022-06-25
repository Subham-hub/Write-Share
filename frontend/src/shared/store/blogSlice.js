import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { myBlogs: [], allBlogs: [] },
  reducers: {
    addBlogs(state, action) {
      const { flag } = action.payload
      switch (flag) {
        case 'initial':
          const { myBlogs, allBlogs } = action.payload
          sessionStorage.setItem(
            'blogData',
            JSON.stringify(myBlogs.map((blog) => blog)),
          )
          state.myBlogs = myBlogs
          state.allBlogs = allBlogs
          break
        case 'add':
          const { newBlog } = action.payload
          state.myBlogs = [...current(state).myBlogs, newBlog]
          state.allBlogs = [...current(state).allBlogs, newBlog]
          break
        default:
          throw new Error('Wrong flag value')
      }
    },
    editBlogs(state, action) {
      const { bid, data } = action.payload
      const blog = current(state).myBlogs.find((blog) => blog._id === bid)
      const myBlogsIndex = current(state).myBlogs.indexOf(blog)
      const allBlogsIndex = current(state).allBlogs.indexOf(blog)
      state.myBlogs[myBlogsIndex].title = data.title
      state.myBlogs[myBlogsIndex].description = data.description
      state.allBlogs[allBlogsIndex].title = data.title
      state.allBlogs[allBlogsIndex].description = data.description
    },
    deleteBlogs(state, action) {
      state.myBlogs = current(state).myBlogs.filter(
        (blog) => blog._id !== action.payload,
      )
      state.allBlogs = current(state).allBlogs.filter(
        (blog) => blog._id !== action.payload,
      )
    },
  },
})

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await (
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/blogs`)
    ).data
    const userData = JSON.parse(localStorage.getItem('userData'))
    let uid
    if (userData) uid = userData.uid
    const myBlogs = blogs.filter((blog) => blog.uid === uid)
    dispatch(
      blogActions.addBlogs({ flag: 'initial', myBlogs, allBlogs: blogs }),
    )
  }
}

export default blogSlice.reducer
export const blogActions = blogSlice.actions
