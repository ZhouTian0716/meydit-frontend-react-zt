// Data fetched from API
export interface ITopMaker {
  id: string;
  name: string;
  bio: string;
  profile: string;
  avatar: string;
}

export interface IAccount {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: string;
  remember_me_token?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Validation usage for CRUD operations
// ZT-NOTE: 如果我这里设立了，在组件里引用的时候就能避免typo的问题
export interface ICreateAccount {
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  firstName?: string;
  lastName?: string;  
}

export interface ICreateProject {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
}

export interface IProjectsStoreRes {
  id: number;
  slug?: string;
  status?: string;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateImage {
  url: string;
  fileName: string;
  projectId: number;
}



interface IImage {
  id: number;
  url: string;
  projectId?: string;
  bidId?: string;
  commentId?: string;
  messageId?: string;
  createdAt: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IAdonisValidationError {
  rule: string;
  field: string;
  message: string;
  args?: {
    minLength?: number;
    maxLength?: number;
  };
}
