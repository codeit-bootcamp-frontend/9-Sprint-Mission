import ApiInstance from "../../../shared/api/base";
import { SignInForm } from "../types/signin-form";
import { SignUpForm } from "../types/signup-form";
import { AuthResponse } from "../types/auth-response"; // 타입 임포트

export const authSignIn = async (formData: SignInForm) => {
  try {
    const response = await ApiInstance.post("/auth/signIn", formData);

    // accessToken과 refreshToken을 localStorage에 저장
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    // 사용자 정보 저장 (id, nickname, image)
    const { id, nickname, image } = response.data.user;
    localStorage.setItem("userId", id.toString());
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("image", image);

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    alert("로그인에 실패했습니다.");
    return null;
  }
};

export const authSignUp = async (formData: SignUpForm) => {
  try {
    const response = await ApiInstance.post("/auth/signUp", formData);

    // accessToken과 refreshToken을 localStorage에 저장
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    // 사용자 정보 저장 (id, nickname, image)
    const { id, nickname, image } = response.data.user;
    localStorage.setItem("userId", id.toString());
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("image", image);

    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    alert("회원가입에 실패했습니다.");
    return null;
  }
};
