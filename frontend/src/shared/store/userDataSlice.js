import { createSlice } from '@reduxjs/toolkit'

const initialUserDataState = {
  uid: '',
  name: '',
  token: '',
}
const userDataSlice = createSlice({
  name: 'User Data',
  initialState: initialUserDataState,
  reducers: {
    setData(state, action) {
      const { uid, name, token } = action.payload
      localStorage.setItem('userData', JSON.stringify({ uid, name, token }))
      state.uid = uid
      state.name = name
      state.token = token
    },
  },
})

export default userDataSlice.reducer
export const userDataActions = userDataSlice.actions
