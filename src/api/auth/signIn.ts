import axios from "axios";
import { LoginFormValues } from "@/types/auth";

export const signIn = async (formData: LoginFormValues) => {
  try {
    const response = await axios.post("/api/auth/signIn", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};
