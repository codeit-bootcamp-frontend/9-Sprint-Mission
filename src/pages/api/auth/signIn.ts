// pages/api/auth/signIn.ts
import { NextApiRequest, NextApiResponse } from "next";
import apiClient from "@/lib/apiClient";
import { serialize } from "cookie";
import { LoginFormValues } from "@/types/auth";
import { AxiosError } from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password }: LoginFormValues = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "이메일과 비밀번호를 모두 입력해주세요.",
      });
    }

    const response = await apiClient.post("/auth/signIn", {
      email,
      password,
    });

    if (!response.data || !response.data.accessToken || !response.data.refreshToken) {
      return res.status(500).json({
        success: false,
        message: "토큰 정보가 올바르지 않습니다.",
      });
    }

    const { accessToken, refreshToken } = response.data;

    res.setHeader("Set-Cookie", [
      serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 30,
        path: "/",
      }),
      serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }),
    ]);

    return res.status(200).json({ success: true, user: response.data.user });
  } catch (error) {
    console.error("SignIn Error:", error);

    if (error instanceof AxiosError && error.response) {
      const { status, data } = error.response;
      return res.status(status).json({
        success: false,
        message: data.message || "로그인 중 오류가 발생했습니다.",
        error: data.error,
      });
    }

    return res.status(500).json({
      success: false,
      message: "서버 내부 오류가 발생했습니다.",
    });
  }
}
