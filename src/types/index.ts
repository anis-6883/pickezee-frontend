export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface IAuthState {
  user?: any | undefined;
  role: string;
  isLoggedIn: boolean;
  token: string | null;
}
