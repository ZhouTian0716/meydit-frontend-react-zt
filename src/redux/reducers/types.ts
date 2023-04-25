export interface IAuthStateAccount {
  email: string;
  role: string;
  first_name?: string | null;
  last_name?: string | null;
}

export interface IAuthStateToken {
  type: string;
  token: string;
  expires_at?: string | null;
}

export interface IAuthState {
  account: IAuthStateAccount;
  token: IAuthStateToken;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

export interface ILoginData {
  account: IAuthStateAccount;
  token: IAuthStateToken;
}
