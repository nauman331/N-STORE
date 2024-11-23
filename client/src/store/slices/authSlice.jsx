import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState : {
    token: null,
    userdata: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, userdata } = action.payload;
      state.token = token;
      state.userdata = userdata;

    },
    logOut: (state) => {
      state.userdata = null;
      state.token = null;
    }
  },

  
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
