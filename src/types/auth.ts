export interface AuthResponse {
  success: boolean;
  message: string;
  user: User | null;
}

export interface User {
  id: string;
  email: string;
  nickname: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}
