// pages/api/auth/signIn.ts
import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "@/api/axiosConfig";
import cookie from "cookie";
import { AuthResponse, LoginFormValues } from "@/types/auth";
import { AxiosError } from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password }: LoginFormValues = req.body;

    try {
      // 백엔드 API에 로그인 요청
      const response = await axiosInstance.post("/auth/signIn", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      // HttpOnly 쿠키로 토큰 설정
      res.setHeader("Set-Cookie", [
        cookie.serialize("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 30, // 30분
          path: "/",
        }),
        cookie.serialize("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 7일
          path: "/",
        }),
      ]);

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
          message: data.message || "로그인 중 오류가 발생했습니다.",
          error: data.error,
        });
      }
    }
  }
}
