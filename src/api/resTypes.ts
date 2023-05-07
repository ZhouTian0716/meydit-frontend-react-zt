export interface ILoginRes {
  account: IAccount;
  token: IToken;
}

interface IAccount {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  remeberMeToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: {
    id: number;
    name: string;
  };
  profile: IProfile;
}

interface IProfile {
  id: number | null;
  bio: string | null;
  avatar: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IToken {
  type: string;
  token: string;
  expires_at: Date | string;
}
