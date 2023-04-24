export interface ITopMaker {
  id: string;
  name: string;
  bio: string;
  profile: string;
  avatar: string;
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

export interface ILoginData {
  email: string;
  password: string;
}
