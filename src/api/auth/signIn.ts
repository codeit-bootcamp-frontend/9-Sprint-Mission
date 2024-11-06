import axios from "axios";
import { LoginFormValues, AuthResponse } from "@/types/auth";

export const signIn = async (formData: LoginFormValues): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>("/api/auth/signIn", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as AuthResponse;
    }
    throw error;
  }
};
