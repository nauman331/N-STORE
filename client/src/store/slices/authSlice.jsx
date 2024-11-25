import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState : {
    token: null,
    userdata: null,
    totaldiscountedcartamount: null
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
    },
    setTotalDiscountedCartAmount: (state, action) => {
      const {totaldiscountedcartamount} = action.payload;
      state.totaldiscountedcartamount = totaldiscountedcartamount
    }
  },

  
});

export const { setCredentials, logOut, setTotalDiscountedCartAmount } = authSlice.actions;
export default authSlice.reducer;
