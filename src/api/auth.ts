// src/api/auth.ts
import { isAxiosError } from "axios";
import axiosInstance from "./axiosConfig";
import Cookies from "js-cookie";
import { LoginFormValues, SignupFormValues, AuthResponse } from "@/types/auth";
import DefaultAvatar from "@/images/ui/ic_profile.svg";

// 사용자 이미지 설정 함수
const setUserImage = (image: string | null) => {
  if (image) {
    Cookies.set("userImage", image);
  } else {
    Cookies.set("userImage", DefaultAvatar.src);
  }
};

// 쿠키 설정 함수
const setCookie = (name: string, value: string, expires: number) => {
  Cookies.set(name, value, { expires, secure: true, sameSite: "strict" });
};

// 로그인 함수
export const logIn = async (
  formData: LoginFormValues
): Promise<AuthResponse | null> => {
  try {
    const response = await axiosInstance.post("/auth/signIn", formData);

    if (response.status === 400) {
      throw new Error("Invalid request");
    }

    const { accessToken, refreshToken, user } = response.data;
    const { id, nickname, image } = user;

    // 클라이언트에서 토큰을 저장
    setCookie("accessToken", accessToken, 1 / 48); // 30분
    setCookie("refreshToken", refreshToken, 7); // 7일
    setCookie("userId", id.toString(), 1 / 48);
    setCookie("nickname", nickname, 1 / 48);
    setUserImage(image);

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 400) {
      console.error("400 Bad Request:", error.response.data);
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    } else {
      console.error("Unknown error occurred");
      alert("알 수 없는 오류가 발생했습니다");
    }

    return null;
  }
};

// 회원가입 함수
export const signup = async (
  formData: SignupFormValues
): Promise<AuthResponse | null> => {
  try {
    const response = await axiosInstance.post("/auth/signUp", formData);

    if (response.status === 400) {
      throw new Error("Invalid request");
    }

    const { accessToken, refreshToken, user } = response.data;
    const { id, nickname, image } = user;

    // 클라이언트에서 토큰을 저장
    setCookie("accessToken", accessToken, 1 / 48); // 30분
    setCookie("refreshToken", refreshToken, 7); // 7일
    setCookie("userId", id.toString(), 1 / 48);
    setCookie("nickname", nickname, 1 / 48);
    setUserImage(image);

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 400) {
      console.error("400 Bad Request:", error.response.data);
      alert("이메일 또는 닉네임이 이미 사용 중입니다.");
    } else {
      console.error("Unknown error occurred");
      alert("알 수 없는 오류가 발생했습니다");
    }

    return null;
  }
};

// 로그아웃 함수
export const logout = async (redirectToSignIn: () => void) => {
  try {
    // 쿠키에서 토큰 및 사용자 정보 제거
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userId");
    Cookies.remove("nickname");
    Cookies.remove("userImage");

    // Axios 인스턴스의 기본 헤더에서 Authorization 제거
    delete axiosInstance.defaults.headers.common["Authorization"];

    console.log("로그아웃 성공");

    // 로그아웃 후 signin 페이지로 리다이렉션
    redirectToSignIn();
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
  }
};

// 토큰 갱신 함수
export const refreshAccessToken = async (
  refreshToken: string
): Promise<AuthResponse | null> => {
  try {
    const response = await axiosInstance.post("/auth/refresh-token", {
      refreshToken,
    });

    if (response.status === 200) {
      const { accessToken } = response.data;

      // 새로운 accessToken을 쿠키에 저장
      setCookie("accessToken", accessToken, 1 / 48); // 30분

      // Axios 인스턴스의 기본 헤더에 새로운 accessToken 설정
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      // 사용자 정보 가져오기
      const userResponse = await axiosInstance.get("/users/me");
      const user = userResponse.data;

      // 사용자 정보 쿠키에 저장
      setCookie("userId", user.id.toString(), 1 / 48);
      setCookie("nickname", user.nickname, 1 / 48);
      setUserImage(user.image);

      return {
        accessToken,
        refreshToken, // 기존 refreshToken 유지
        user,
      };
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("refreshToken이 유효하지 않거나 만료되었습니다!");

        // refreshToken이 만료되었으므로 모든 인증 관련 쿠키 삭제
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userId");
        Cookies.remove("nickname");
        Cookies.remove("userImage");

        // Axios 인스턴스의 기본 헤더에서 Authorization 제거
        delete axiosInstance.defaults.headers.common["Authorization"];

        console.log("로그아웃 성공");
      } else {
        console.error("Error refreshing token:", error.response?.data);
      }
    } else {
      console.error("refreshToken에 알 수 없는 오류가 발생하였습니다!");
    }
    return null;
  }
};
