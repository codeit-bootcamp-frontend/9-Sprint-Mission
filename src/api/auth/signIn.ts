import axios from "axios";
import { LoginFormValues, User } from "@/types/auth";

export const signIn = async (
  formData: LoginFormValues
): Promise<User | null> => {
  try {
    const response = await axios.post("/api/auth/signIn", formData); // Next.js API Route 호출

    if (response.status === 200) {
      console.log("message: ", response.data.message);
      return response.data.user;
    }
  } catch (error) {
    console.error("로그인 실패:", error);
    throw new Error("로그인 요청에 실패했습니다.");
  }

  return null;
};
