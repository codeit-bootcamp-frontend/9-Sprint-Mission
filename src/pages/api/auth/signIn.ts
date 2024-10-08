// pages/api/auth/signIn.ts
import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "@/api/axiosConfig";
import cookie from "cookie";
import { AuthResponse, LoginFormValues } from "@/types/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password }: LoginFormValues = req.body;

    try {
      // 백엔드 API에 로그인 요청
      const response = await axiosInstance.post("/auth/signIn", {
        email,
        password,
      });

      const { accessToken, refreshToken, user }: AuthResponse = response.data;

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
      return res.status(200).json({ message: "로그인 성공", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "로그인 요청에 실패했습니다." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
