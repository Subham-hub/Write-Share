import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "Authentication",
  initialState: {
    isLoggedIn: false,
    isLoggingIn: true,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.clear();
      sessionStorage.clear();
      state.isLoggedIn = false;
    },
    isLogging(state) {
      state.isLoggingIn = true;
    },
    isSigning(state) {
      state.isLoggingIn = false;
    },
  },
});

export const serverLogout = () => {
  return async (dispatch) => {
    try {
      const userData = localStorage.getItem("userData");
      const token = JSON.parse(userData).token;
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(authActions.logout());
    } catch (e) {
      throw new Error(e);
    }
  };
};

export default authSlice.reducer;
export const authActions = authSlice.actions;
