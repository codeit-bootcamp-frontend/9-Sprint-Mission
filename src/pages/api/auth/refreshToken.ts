// src/pages/api/auth/refreshToken.ts
import axiosInstance from "@/api/axiosConfig";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { User } from "@/types/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { refreshToken } = req.cookies; // 쿠키에서 refreshToken을 가져옴

    if (!refreshToken) {
      return res
        .status(200)
        .json({ isLogin: false, message: "로그인이 필요합니다." });
    }

    try {
      // 백엔드 API에 refreshToken을 사용하여 새로운 accessToken 요청
      const response = await axiosInstance.post("/auth/refresh-token", {
        refreshToken,
      });

      const { accessToken } = response.data;

      // 새로운 accessToken을 HttpOnly 쿠키에 저장
      res.setHeader("Set-Cookie", [
        cookie.serialize("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 30, // 30분
          path: "/",
        }),
      ]);

      // 새로운 accessToken으로 사용자 정보 요청
      try {
        const userResponse = await axiosInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const user = userResponse.data as User;

        return res
          .status(200)
          .json({ isLogin: true, message: "토큰 갱신 성공", user });
      } catch (userError) {
        console.error("사용자 정보 조회 실패:", userError);
        return res.status(200).json({
          isLogin: false,
          message: "사용자 정보 조회에 실패했습니다.",
        });
      }
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      return res.status(200).json({
        isLogin: false,
        message: "유효하지 않은 refreshToken 입니다.",
      });
    }
  }
}
