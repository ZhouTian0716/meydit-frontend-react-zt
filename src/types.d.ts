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
  first_name?: string;
  last_name?: string;
  email?: string;
  role: string;
  remember_me_token?: string;
  created_at?: string;
  updated_at?: string;
}

// Validation usage for CRUD operations
export interface ICreateAccount {
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  first_name?: string;
  last_name?: string;
}

export interface ICreateProject {
  id: number;
  slug: string;
  title: string;
  description: string;
  images: IImage[];
}

interface IImage {
  id: number;
  url: string;
  project_id?: string;
  bid_id?: string;
  comment_id?: string;
  message_id?: string;
  created_at: string;
  updated_at: string;
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
