// src/pages/api/auth/refreshToken.ts
import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
      return res.status(200).json({ success: false, user: null });
    }

    try {
      const response = await apiClient.post("/auth/refresh-token", {
        refreshToken,
      });

      const { accessToken } = response.data;

      res.setHeader("Set-Cookie", [
        serialize("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 30, // 30분
          path: "/",
        }),
      ]);

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      return res.status(500).json({ success: false });
    }
  }
}
