export interface IUpdateAddress {
  number?: string | null;
  route?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  isPrimary?: boolean;
}

export interface ICreateAddress {
  number?: string | null;
  route?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  isPrimary?: boolean;
}

export interface IUpdateAccount {
  firstName: string | null;
  lastName: string | null;
  password?: string | null;
}

export interface IUpdateProfile {
  avatar?: string;
  bio?: string | null;
}

export interface ICreateImage {
  url: string;
  fileName: string;
  projectId: number;
}

export interface IUpdateImage {
  isProjectCover: boolean;
}

export interface ICreateProject {
  title: string ;
  startPrice: number;
  description: string | null;
  categoryId: number;
  tagIds: number[] | null;
}

export interface IUpdateProject {
  title?: string;
  description?: string;
  startPrice?: number;
  makerId?: number;
  categoryId?: number;
  statusId?: number;
}
