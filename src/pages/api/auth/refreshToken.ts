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
      return res.status(401).json({ message: "No refresh token found" });
    }

    try {
      // 백엔드 API에 refreshToken을 사용하여 새로운 accessToken 요청
      const response = await axiosInstance.post("/auth/refresh-token", {
        refreshToken,
      });

      const { accessToken } = response.data;

      const user = (await axiosInstance.get("/users/me")).data as User;

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

      return res.status(200).json({ message: "토큰 갱신 성공", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "토큰 갱신 실패" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
