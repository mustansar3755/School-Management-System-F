import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dashboardSlice from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // router mein state.auth isi wajah se chalega
    dashboard: dashboardSlice, // dashboard ke liye reducer add karna hoga
  },
});