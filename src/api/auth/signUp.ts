import axios from "axios";
import { SignupFormValues } from "@/types/auth";

export const signUp = async (formData: SignupFormValues) => {
  try {
    const response = await axios.post("/api/auth/signUp", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};
