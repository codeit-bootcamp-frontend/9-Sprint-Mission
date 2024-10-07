export interface User {
  id: string | null;
  nickname: string | null;
  image: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
