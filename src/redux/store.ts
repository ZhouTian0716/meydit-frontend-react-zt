import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },

  // devTools:false
  // This setup can close devtool in browser for security reasons.
});
