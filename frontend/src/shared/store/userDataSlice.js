import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

import { authActions } from './authSlice'

const initialUserDataState = {
  uid: '',
  firstname: '',
  lastname: '',
  email: '',
  avatar: { id: '', secure_url: '' },
  blogs: [],
  token: '',
}
const userDataSlice = createSlice({
  name: 'User Data',
  initialState: initialUserDataState,
  reducers: {
    setData(state, action) {
      state.uid = action.payload.uid
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
      state.email = action.payload.email
      state.avatar = action.payload.avatar
      state.blogs = action.payload.blogs
      state.token = action.payload.token
    },
    updateData(state, action) {
      const { flag } = action.payload
      switch (flag) {
        case 'INFO':
          const { firstname, lastname, email } = action.payload
          state.firstname = firstname
          state.lastname = lastname
          state.email = email
          break
        case 'AVATAR':
          const { avatarFlag, avatar } = action.payload
          if (avatarFlag === 'CHANGE') {
            state.avatar = avatar
            return
          }
          state.avatar.id = null
          state.avatar.secure_url = null
          break
        case 'BLOGS':
          const { bid, blogFlag } = action.payload
          if (blogFlag === 'ADD') {
            state.blogs = [bid, ...current(state).blogs]
            return
          }
          state.blogs = current(state).blogs.filter((b) => b !== bid)
          break
        default:
          throw new Error('Wrong flag value')
      }
    },
  },
})

export const autoLogin = () => {
  return async (dispatch) => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      const { uid, token } = JSON.parse(userData)
      try {
        const user = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_BACKEND_URL}/users/get_user/${uid}`,
          headers: { Authorization: `Bearer ${token}` },
        })
        dispatch(authActions.login())
        dispatch(
          userDataActions.setData({
            uid,
            token,
            avatar: user.data.avatar,
            firstname: user.data.firstname,
            lastname: user.data.lastname,
            email: user.data.email,
            blogs: user.data.blogs,
          }),
        )
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

export default userDataSlice.reducer
export const userDataActions = userDataSlice.actions
