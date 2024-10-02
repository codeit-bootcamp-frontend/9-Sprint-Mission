import axios from "axios";
import toast from "react-hot-toast";

// tailwind 동적 스타일을 위한 함수
export const cls = (...cls: string[]) => {
  return cls.join(" ");
}

// 토큰갱신 함수
export const getRefreshToken = async (accessToken: string) => {
  try {
    const response = await axios.post("/api/auth/refreshToken", {
      accessToken
    });

    if (response.status === 200) {
      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("getRefreshToken 유틸리티 함수에서 api 오류 발생", error);
      toast.error(error.response?.data);
    }
  }
}
