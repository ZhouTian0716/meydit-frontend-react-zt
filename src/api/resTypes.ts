export interface ILoginRes {
  account: IAccount;
  token: IToken;
}

export interface IAccount {
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
  addresses: IAddress[];
}

export interface IProfile {
  id: number;
  bio: string | null;
  avatar: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAddress {
  id: number;
  number?: string | null;
  route?: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  isPrimary: boolean;
}

export interface IProject {
  id: number;
  slug: string;
  title: string;
  description: string;
  startPrice: number;
  client: IAccount;
  maker: IAccount | null;
  category: ICategory;
  status: IStatus;
  images: IImage[];
  tags: ITag[] | [];
  bids: IBid[] | [];
  createdAt: Date;
  updatedAt: Date;
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

export interface IStatus {
  id: number;
  name: string;
}

export interface IImage {
  id: number;
  url: string;
  fileName: string;
  isProjectCover: boolean;
}

export interface IBid {
  id: number;
  price: number;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
  maker: IAccount;
}
