import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginApi, logoutApi } from "../../api/auth";
import { ILoginData } from "../../types";
import { IAuthState, IAuthStateAccount } from "./types";
import { RootState } from "../store";

const initialState: IAuthState = {
  account: {
    email: "",
    role: "",
    first_name: null,
    last_name: null,
  },
  token: {
    type: "",
    token: "",
    expires_at: "",
  },
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: ILoginData) => {
    const response = await loginApi(data);
    return response;
  }
);

export const logout = createAsyncThunk("auth/logout", async (token: string) => {
  const response = await logoutApi(token);
  return response;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const statusCode = action.payload.status;
        if (statusCode !== 200) {
          state.error = "Failed to login";
        } else {
          // ZT-NOTE: Here means login successfully
          // Plug in the account info to the state
          state.error = null;
          state.token = action.payload.data.token;
          state.account = action.payload.data.account;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  },
});

// ZT-NOTE: Action creators exports
export const { resetAuth } = authSlice.actions;

// ZT-NOTE: Selector funtions exports for multiple react components to use
export const getLoginAccount = (state: RootState) => state.auth.account;
export const getTokenObj = (state: RootState) => state.auth.token;
export const getAuthStatus = (state: RootState) => state.auth.status;
export const getAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
