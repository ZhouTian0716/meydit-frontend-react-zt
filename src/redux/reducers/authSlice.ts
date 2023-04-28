import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IAuthStateAccount, ILoginData } from "./types";
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserIn: (state, action: PayloadAction<ILoginData>) => {
      state.account = action.payload.account;
      state.token = action.payload.token;
    },
    logUserOut: (state) => {
      state.account = initialState.account;
      state.token = initialState.token;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
});

// ZT-NOTE: Action creators exports
export const { logUserIn, logUserOut } = authSlice.actions;

// ZT-NOTE: Selector funtions exports for multiple react components to use
export const getAccount = (state: RootState) => state.auth.account;
export const getToken = (state: RootState) => state.auth.token;
// export const getAuthStatus = (state: RootState) => state.auth.status;
// export const getAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;