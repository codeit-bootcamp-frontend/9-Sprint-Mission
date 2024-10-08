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
  email: string | null;
  image: string | null;
  nickname: string | null;
  updatedAt: Date | null;
  createdAt: Date | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
