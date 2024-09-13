import ApiInstance from "../../../shared/api/base";
import { SignInForm } from "../types/signin-form";
import { SignUpForm } from "../types/signup-form";
import { getBase64Image } from "../utils/base64Image";
import { AuthResponse } from "../types/auth-response"; // 타입 임포트
import DefaultAvatar from "../../../shared/assets/images/login/default_avatar.png";

export const authSignIn = async (
  formData: SignInForm
): Promise<AuthResponse | null> => {
  try {
    const response = await ApiInstance.post("/auth/signIn", formData);

    // accessToken과 refreshToken을 sessionStorage에 저장
    sessionStorage.setItem("accessToken", response.data.accessToken);
    sessionStorage.setItem("refreshToken", response.data.refreshToken);

    // 사용자 정보 저장 (id, nickname, image)
    const { id, nickname, image } = response.data.user;
    sessionStorage.setItem("userId", id.toString());
    sessionStorage.setItem("nickname", nickname);

    if (image) {
      sessionStorage.setItem("userImage", image);
    } else {
      // DefaultAvatar 이미지를 Base64로 변환하여 저장
      const base64Avatar = await getBase64Image(DefaultAvatar);
      sessionStorage.setItem("userImage", base64Avatar);
    }

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
    const response = await ApiInstance.post("/auth/signUp", formData);

    // accessToken과 refreshToken을 sessionStorage에 저장
    sessionStorage.setItem("accessToken", response.data.accessToken);
    sessionStorage.setItem("refreshToken", response.data.refreshToken);

    // 사용자 정보 저장 (id, nickname, image)
    const { id, nickname, image } = response.data.user;
    sessionStorage.setItem("userId", id.toString());
    sessionStorage.setItem("nickname", nickname);

    if (image) {
      sessionStorage.setItem("userImage", image);
    } else {
      // DefaultAvatar 이미지를 Base64로 변환하여 저장
      const base64Avatar = await getBase64Image(DefaultAvatar);
      sessionStorage.setItem("userImage", base64Avatar);
    }

    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    alert("회원가입에 실패했습니다.");
    return null;
  }
};
