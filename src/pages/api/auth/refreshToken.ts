// src/pages/api/auth/refreshToken.ts
import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { AxiosError } from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(200).json({ success: false, message: "No refresh token" });
  }

  try {
    // 1. 토큰 갱신 시도
    const response = await apiClient.post<{ accessToken: string }>("/auth/refresh-token", {
      refreshToken,
    });

    const { accessToken } = response.data;

    // 2. 새로운 accessToken 쿠키 설정
    res.setHeader("Set-Cookie", [
      serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 30, // 30분
        path: "/",
      }),
    ]);

    try {
      // 3. 사용자 정보 조회
      const meResponse = await apiClient.get("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.status(200).json({
        success: true,
        user: meResponse.data,
      });
    } catch (userError) {
      // 사용자 정보 조회 실패 시에도 토큰 갱신은 성공했으므로 200 반환
      console.error("사용자 정보 조회 실패:", userError);
      return res.status(200).json({
        success: true,
        user: null,
      });
    }
  } catch (error) {
    console.error("토큰 갱신 실패:", error);

    // refreshToken이 만료되었거나 유효하지 않은 경우
    if (error instanceof AxiosError && error.response?.status === 401) {
      // refreshToken 쿠키 제거
      res.setHeader("Set-Cookie", [
        serialize("refreshToken", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 0,
          path: "/",
        }),
        serialize("accessToken", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 0,
          path: "/",
        }),
      ]);

      return res.status(200).json({
        success: false,
        message: "Token expired",
      });
    }

    // 기타 에러의 경우도 200으로 응답하되 success: false
    return res.status(200).json({
      success: false,
      message: "Failed to refresh token",
    });
  }
}
