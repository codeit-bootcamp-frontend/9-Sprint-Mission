import axios from "axios";
import { RefreshTokenResponse } from "@/types/auth";

export const checkAuthStatus = async (): Promise<RefreshTokenResponse> => {
  try {
    const response = await axios.post<RefreshTokenResponse>(
      "/api/auth/refreshToken"
    );
    return response.data;
  } catch (error) {
    console.error("인증 상태 확인 중 오류 발생:", error);
    return {
      isLogin: false,
      message: "인증 상태 확인 중 오류가 발생했습니다.",
      status: 500,
    };
  }
};
