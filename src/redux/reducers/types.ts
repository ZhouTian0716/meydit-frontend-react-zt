export interface IAuthStateAccount {
  email: string | null;
  role: string | null;
  first_name?: string | null;
  last_name?: string | null;
}

export interface IAuthState {
  account: IAuthStateAccount;
  token: string | null;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}
