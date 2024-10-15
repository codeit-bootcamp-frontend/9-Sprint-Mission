// utils/cookie.ts
import Cookies from "js-cookie";
import axios from "axios";

export const ACCESS_TOKEN_EXPIRY = 1 / 48; // 30분을 일 단위로 표현
export const REFRESH_TOKEN_EXPIRY = 7; // 7일

// 쿠키 설정 함수
export const setCookie = (name: string, value: string, expires: number) => {
  Cookies.set(name, value, {
    expires, // 쿠키 만료 시간 설정 (일 단위)
    secure: process.env.NODE_ENV === "production", // 배포 환경에서만 secure 설정
    sameSite: "strict", // CSRF 방지
    path: "/", // 모든 경로에서 쿠키 접근 가능
  });
};

// 쿠키 가져오기 함수
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

// 모든 인증 관련 쿠키를 삭제하는 함수
export const removeAllAuthCookies = async () => {
  try {
    // 서버에 로그아웃 요청을 보냅니다.
    await axios.post("/api/auth/logout");

    // 클라이언트 측 쿠키 삭제
    const clientSideAuthCookies = ["userId", "nickname", "userImage"];
    clientSideAuthCookies.forEach((cookieName) => {
      removeCookie(cookieName);
    });
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    throw error;
  }
};

// 쿠키 삭제 함수
const removeCookie = (name: string) => {
  Cookies.remove(name, { path: "/" });
};
