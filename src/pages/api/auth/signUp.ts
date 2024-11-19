import { AxiosError } from "axios";
import apiClient from "@/lib/apiClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await apiClient.post("/auth/signup", req.body);
      return res.status(200).json({ success: true, message: "회원가입이 성공했습니다!" });
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
