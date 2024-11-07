// src/pages/api/auth/refreshToken.ts
import axiosInstance from "@/api/axiosConfig";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      await axiosInstance.post("/auth/logout");
    }

    try {
      const response = await axiosInstance.post("/auth/refresh-token", {
        refreshToken,
      });

      const { accessToken } = response.data;

      res.setHeader("Set-Cookie", [
        cookie.serialize("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 30, // 30분
          path: "/",
        }),
      ]);
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
    }
  }
}
