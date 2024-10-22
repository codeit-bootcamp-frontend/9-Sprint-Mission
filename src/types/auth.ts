import { ReactNode } from "react";

export interface User {
  id: number;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (
    email: string,
    password: string,
    nickname: string,
    passwordConfirmation: string
  ) => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
