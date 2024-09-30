// types/auth.d.ts
export interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  image: string | null;
  nickname: string;
  updatedAt: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
