/* eslint-disable import/no-cycle */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import uiReducer from "./reducers/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
  // devTools:false
  // This setup can close devtool in browser for security reasons.
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
