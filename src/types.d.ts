// Data fetched from API


export interface IAccount {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: {
    id: number;
    name: string;
  };
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
  roleId: number;
  firstName?: string;
  lastName?: string;
}



export interface ICreateProject {
  title: string | null;
  startPrice: number | null;
  description: string | null;
  categoryId: number | null;
  tagIds: number[] | null;
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
