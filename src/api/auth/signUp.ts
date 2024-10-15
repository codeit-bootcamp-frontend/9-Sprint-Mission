import axios from "axios";
import { SignupFormValues, SignUpResponse } from "@/types/auth";

export const signUp = async (
  formData: SignupFormValues
): Promise<SignUpResponse> => {
  try {
    const response = await axios.post<SignUpResponse>(
      "/api/auth/signUp",
      formData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as SignUpResponse;
    }
    throw error;
  }
};
