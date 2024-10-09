// pages/api/auth/signIn.ts
import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "@/api/axiosConfig";
import cookie from "cookie";
import { AuthResponse, LoginFormValues, SignInResponse } from "@/types/auth";
import { AxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password }: LoginFormValues = req.body;

    try {
      // 백엔드 API에 로그인 요청
      const response = await axiosInstance.post<AuthResponse>("/auth/signIn", {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

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

      // 사용자 정보 반환
      return res.status(200).json({
        success: true,
        message: "로그인 성공",
        user,
      } as SignInResponse);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // 백엔드에서 반환한 에러 메시지와 상태 코드를 사용
        const { status, data } = error.response;
        return res.status(200).json({
          success: false,
          message: data.message || "로그인 중 오류가 발생했습니다.",
          error: data.error,
          status: status,
        } as SignInResponse);
      } else {
        // 예상치 못한 에러의 경우
        return res.status(200).json({
          success: false,
          message: "서버 오류가 발생했습니다.",
          error: "INTERNAL_SERVER_ERROR",
          status: 500,
        } as SignInResponse);
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    } as SignInResponse);
  }
}
