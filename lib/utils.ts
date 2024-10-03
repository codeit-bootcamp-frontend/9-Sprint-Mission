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

// 'O시간 전'로 변환하는 함수
export const formatCommentsTime = (commentsDate: string): string => {
  const date = new Date(commentsDate);

  if (isNaN(date.getTime())) {
    return "유효하지 않은 날짜";
  }
  const currentTime = new Date();

  const diffMilliseconds = currentTime.getTime() - date.getTime();  // 현재와 코멘트 업데이트날짜와의 차이 (밀리초)
  const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));  // 위 차이를 시간으로 변환

  if (diffHours < 1) {
    return "방금 전";
  } else {
    return `${diffHours}시간 전`;
  }
};