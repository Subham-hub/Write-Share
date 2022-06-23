import { configureStore } from '@reduxjs/toolkit'
import userData from './userDataSlice'
import auth from './authSlice'
import blogs from './blogSlice'

const store = configureStore({
  reducer: { auth, userData, blogs },
})

export default store
