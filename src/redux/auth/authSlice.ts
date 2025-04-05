import { IAuthState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  user: null,
  isLoggedIn: false,
  role: "",
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, setToken } = authSlice.actions;

export default authSlice;
