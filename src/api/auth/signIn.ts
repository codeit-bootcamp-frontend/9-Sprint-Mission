import axios from "axios";
import { LoginFormValues, SignInResponse } from "@/types/auth";

export const signIn = async (
  formData: LoginFormValues
): Promise<SignInResponse> => {
  try {
    const response = await axios.post<SignInResponse>(
      "/api/auth/signIn",
      formData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as SignInResponse;
    }
    throw error;
  }
};
