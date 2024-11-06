import axios from "axios";
import { SignupFormValues, AuthResponse } from "@/types/auth";

export const signUp = async (formData: SignupFormValues): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>("/api/auth/signUp", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as AuthResponse;
    }
    throw error;
  }
};
