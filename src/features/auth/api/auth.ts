import ApiInstance from "../../../shared/api/base";
import { SignInForm } from "../types/signin-form";
import { SignUpForm } from "../types/signup-form";
import { AuthResponse } from "../types/auth-response"; // 타입 임포트

export const authSignIn = async (
  formData: SignInForm
): Promise<AuthResponse | null> => {
  try {
    const response = await ApiInstance.post<AuthResponse>(
      "/auth/signIn",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    alert("로그인에 실패했습니다.");
    return null;
  }
};

export const authSignUp = async (
  formData: SignUpForm
): Promise<AuthResponse | null> => {
  try {
    const response = await ApiInstance.post<AuthResponse>(
      "/auth/signUp",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    alert("회원가입에 실패했습니다.");
    return null;
  }
};
