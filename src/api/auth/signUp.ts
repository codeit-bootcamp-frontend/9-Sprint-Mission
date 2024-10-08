import { SignupFormValues, User } from "@/types/auth";
import axios from "axios";

export const signUp = async (
  formData: SignupFormValues
): Promise<User | null> => {
  try {
    const response = await axios.post("/api/auth/signUp ", formData); // Next.js API Route 호출

    if (response.status === 200) {
      console.log("message: ", response.data.message);
      return response.data.user;
    }
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw new Error("회원가입 요청에 실패했습니다.");
  }

  return null;
};
