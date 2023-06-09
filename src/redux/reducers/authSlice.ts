/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./types";
import { RootState } from "../store";
import { IAddress, ILoginRes } from "../../api/resTypes";
import { IUpdateAccount, IUpdateProfile } from "../../api/payloadTypes";

const initialState: IAuthState = {
  account: {
    id: -1,
    email: "",
    firstName: "",
    lastName: "",
    role: {
      id: null,
      name: "",
    },
    profile: {
      id: -1,
      bio: null,
      avatar: null,
    },
    addresses: [],
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
    logUserIn: (state, action: PayloadAction<ILoginRes>) => {
      // console.log("hey hey", action.payload.account);
      state.account = action.payload.account;
      state.token = action.payload.token;
    },
    logUserOut: (state) => {
      state.account = initialState.account;
      state.token = initialState.token;
      state.status = initialState.status;
      state.error = initialState.error;
    },
    updateAccount: (state, action: PayloadAction<IUpdateAccount>) => {
      state.account.firstName = action.payload.firstName;
      state.account.lastName = action.payload.lastName;
    },
    updateProfile: (state, action: PayloadAction<IUpdateProfile>) => {
      state.account.profile = { ...state.account.profile, ...action.payload };
    },
    updatePrimaryAddress: (state, action: PayloadAction<{ selectedId: number }>) => {
      state.account.addresses.forEach((address) => {
        if (address.id === action.payload.selectedId) {
          address.isPrimary = true;
        } else {
          address.isPrimary = false;
        }
      });
    },
    addAddressToState: (state, action: PayloadAction<IAddress>) => {
      state.account.addresses.push(action.payload);
    },
    removeAddressFromState: (state, action: PayloadAction<{ selectedId: number }>) => {
      state.account.addresses = state.account.addresses.filter((address) => address.id !== action.payload.selectedId);
    },
  },
});

// ZT-NOTE: Action creators exports
export const { logUserIn, logUserOut, updateProfile, updateAccount, updatePrimaryAddress, addAddressToState, removeAddressFromState } = authSlice.actions;

// ZT-NOTE: Selector funtions exports for multiple react components to use
export const getAccount = (state: RootState) => state.auth.account;
export const getAddresses = (state: RootState) => state.auth.account.addresses;
export const getToken = (state: RootState) => state.auth.token;
// export const getAuthStatus = (state: RootState) => state.auth.status;
// export const getAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
