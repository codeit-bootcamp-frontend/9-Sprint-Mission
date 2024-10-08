// src/api/auth/refreshToken.ts
import { User } from "@/types/auth";
import axios from "axios";

export const refreshToken = async (): Promise<User | null> => {
  try {
    const response = await axios.post("/api/auth/refreshToken"); // Next.js API 호출

    if (response.status === 200) {
      console.log("message: ", response.data.message);
    } else {
      console.error("message: ", response.data.message);
    }

    return response.data.user;
  } catch (error) {
    console.error("토큰 갱신 요청에 실패했습니다:", error);
  }

  return null;
};
