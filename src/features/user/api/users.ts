import ApiInstance from "../../../shared/api/base";
import { UserResponse } from "../types/user-response";

export const usersMe = async (): Promise<UserResponse | null> => {
  try {
    const response = await ApiInstance.get<UserResponse>("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    alert("로그인에 실패했습니다.");
    return null;
  }
};
