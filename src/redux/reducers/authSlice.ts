import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { registerApi, loginApi, logoutApi } from "../../api/auth";
import { ICreateAccount, ILoginData } from "../../types";
import { IAuthState, IAuthStateAccount } from "./types";
import { RootState } from "../store";

const initialState: IAuthState = {
  account: {
    email: null,
    role: null,
    first_name: null,
    last_name: null,
  },
  token: null,
  status: "idle",
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (data: ICreateAccount, thunkAPI) => {
    try {
      const response = await registerApi(data);
      return response;
    } catch (error) {
      if (!error) return;
      const message = error.toString();
      // ZT-NOTE: The message here is the action.payload for the rejected case
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: ILoginData) => {
    const response = await loginApi(data);
    return response;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (token: string) => {
    const response = await logoutApi(token);
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setLoginAccount: (state, action: PayloadAction<IAuthStateAccount>) => {
    //   state.account = action.payload;
    // },
    resetAuth: (state) => {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // ZT-NOTE: action.payload is the response from the server
        const statusCode = action.payload?.status;
        if (statusCode !== 201) {
          state.error = "Failed to register";
        } else {
          state.error = null;
        }
      })
      .addCase(register.rejected, (state) => {
        state.status = "rejected";
        state.error = "Failed to register";
      })
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

// Action creators are generated for each case of reducers
export const { resetAuth } = authSlice.actions;

// This is easier for component to call useSelector, if our state shape change in the future
export const getLoginAccount = (state: RootState) => state.auth.account;
export const getAuthStatus = (state: RootState) => state.auth.status;
export const getAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
