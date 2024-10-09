import type { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "@/api/axiosConfig";
import { AxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await axiosInstance.post("/auth/signup", req.body);
      res.status(200).json(response.data);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // 백엔드에서 반환한 에러 메시지와 상태 코드를 사용
        const { status, data } = error.response;
        res.status(200).json({
          success: false,
          message: data.message || "회원가입 중 오류가 발생했습니다.",
          error: data.error,
          status: status,
        });
      } else {
        // 예상치 못한 에러의 경우
        res.status(200).json({
          success: false,
          message: "서버 오류가 발생했습니다.",
          error: "INTERNAL_SERVER_ERROR",
          status: 500,
        });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
