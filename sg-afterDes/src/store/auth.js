import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuth: localStorage.getItem("isAuth"),
  email: localStorage.getItem("email"),
  roleName: localStorage.getItem("roleName"),
  id: localStorage.getItem("id"),
  img: localStorage.getItem("img"),
  
  
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(steat, action) {
      steat.isAuth = true;
      steat.roleName = action.payload.roleName;
      steat.email = action.payload.email;
      steat.id = action.payload.id;
      steat.img = action.payload.img;
     
      localStorage.setItem("isAuth", true);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("roleName", action.payload.roleName);
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("img", action.payload.img);
    },
    logout(steat) {
      steat.isAuth = false;
      steat.email = null;
      steat.id = null;
     
      steat.roleName = null;
      steat.img = null;
      localStorage.clear();
    },
  },
});
export const authAction = authSlice.actions;
export default authSlice.reducer;

// login(steat ,action) {
//     steat.isAuth = true;
//     steat.id = action.payload.id;
// },
