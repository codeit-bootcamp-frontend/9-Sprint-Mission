// src/utils/cookie.ts
import Cookies from "js-cookie";

export const ACCESS_TOKEN_EXPIRY = 1 / 48; // 30분을 일 단위로 표현
export const REFRESH_TOKEN_EXPIRY = 7; // 7일

// 쿠키 설정 함수
export const setCookie = (name: string, value: string, expires: number) => {
  Cookies.set(name, value, {
    expires, // 쿠키 만료 시간 설정 (일 단위)
    secure: true, // HTTPS 연결에서만 쿠키 전송 (보안 강화)
    sameSite: "strict", // 같은 사이트 출처의 요청에만 쿠키 전송 (CSRF 공격 방지)
    httpOnly: true, // JavaScript를 통한 쿠키 접근 방지 (XSS 공격 방지)
  });
};

// 쿠키 가져오기 함수
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

// 모든 인증 관련 쿠키를 삭제하는 함수
export const removeAllAuthCookies = () => {
  const authCookies = [
    "accessToken",
    "refreshToken",
    "userId",
    "nickname",
    "userImage",
  ];
  authCookies.forEach((cookieName) => {
    removeCookie(cookieName);
  });
};

// 쿠키 삭제 함수
const removeCookie = (name: string) => {
  Cookies.remove(name);
};
