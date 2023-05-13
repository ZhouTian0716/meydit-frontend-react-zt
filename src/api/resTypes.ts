export interface ILoginRes {
  account: IAccount;
  token: IToken;
}

interface IAccount {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  remeberMeToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: {
    id: number | null;
    name: string;
  };
  profile: IProfile;
}

export interface IProfile {
  id: number;
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

export interface IRole {
  id: number;
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
  url: string;
}

export interface ITag {
  id: number;
  name: string;
}
