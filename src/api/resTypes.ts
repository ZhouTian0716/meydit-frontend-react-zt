export interface ILoginRes {
  account: IAccount;
  token: IToken;
}

interface IAccount {
  id: number | null;
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
  profile: IProfile | null;
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

export interface IRole {
  id: number;
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ITag {
  id: number;
  name: string;
}
