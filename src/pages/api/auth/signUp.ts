import { AxiosError } from "axios";
import axiosInstance from "@/api/axiosConfig";
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthResponse } from "@/types/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await axiosInstance.post("/auth/signup", req.body);
      const responseData: AuthResponse = response.data;
      if (responseData.user) {
        return res.status(200).json({ ...responseData, success: true });
      } else {
        return res.status(400).json({ ...responseData, success: false });
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // 백엔드에서 반환한 에러 메시지와 상태 코드를 사용
        const { status, data } = error.response;
        return res.status(status).json({
          success: false,
          message: data.message || "회원가입 중 오류가 발생했습니다.",
          error: data.error,
        });
      }
    }
  }
}
