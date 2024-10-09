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
  nickname: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
    nickname: string;
  };
}

export interface SignInResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface RefreshTokenResponse {
  isLogin: boolean;
  message: string;
  user?: User;
  status?: number;
}
