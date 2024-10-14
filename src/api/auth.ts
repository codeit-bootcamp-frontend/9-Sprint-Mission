import axiosInstance from './axiosConfig';
import axios, { AxiosError } from 'axios';

// 회원가입 요청 타입
interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

// 로그인 요청 타입
interface LoginRequest {
  email: string;
  password: string;
}

// API 응답 타입
interface AuthResponse {
  user: {
    id: number;
    nickname: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

// 회원가입 API
export const signUp = async (data: SignUpRequest): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      '/auth/signup',
      data
    );
    return response.data;
  } catch (error) {
    console.error('API 에러:', error);
    if (axios.isAxiosError(error)) {
      console.error('에러 응답:', error.response?.data);
    }
    throw error;
  }
};

// 로그인 API
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      '/auth/signin',
      data
    );
    return response.data;
  } catch (error) {
    console.error('API 에러:', error);
    if (axios.isAxiosError(error)) {
      console.error('에러 응답:', error.response?.data);
    }
    throw error;
  }
};

// 로그아웃 함수 (클라이언트 측에서 토큰 제거)
export const logout = (): void => {
  localStorage.removeItem('accessToken');
};

// 토큰 저장 함수
export const saveToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

// 토큰 가져오기 함수
export const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// 로그인 상태 확인 함수
export const isLoggedIn = (): boolean => {
  return !!getToken();
};
