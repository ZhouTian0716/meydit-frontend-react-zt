/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUiState } from "./types";

const initialState: IUiState = {
  bottomNav: false,
  theme: "light",
  bidModal: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleBottomNav: (state) => {
      state.bottomNav = !state.bottomNav;
    },
    toggleBidModal: (state) => {
      if (typeof window !== "undefined" && window.document) {
        document.body.style.overflow = "visible";
      }
      state.bidModal = !state.bidModal;
      if (state.bidModal === true) {
        if (typeof window !== "undefined" && window.document) {
          document.body.style.overflow = "hidden";
        }
      }
    },
  },
});

// ZT-NOTE: Action creators exports
export const { toggleBottomNav, toggleBidModal } = uiSlice.actions;

// ZT-NOTE: Selector funtions exports for multiple react components to use
export const isShowBottomNav = (state: RootState) => state.ui.bottomNav;
export const isBidModal = (state: RootState) => state.ui.bidModal;

export default uiSlice.reducer;
