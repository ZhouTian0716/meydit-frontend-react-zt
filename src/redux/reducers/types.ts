import { ILoginRes } from "../../api/resTypes";

export interface IAuthState extends ILoginRes {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

// uiSlice.ts
export interface IUiState {
  bottomNav: boolean;
  theme: string;
}
