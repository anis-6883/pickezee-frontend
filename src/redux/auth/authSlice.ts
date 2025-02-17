import { IAuthState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  user: null,
  isLoggedIn: false,
  role: "",
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, setAccessToken } =
  authSlice.actions;

export default authSlice;
