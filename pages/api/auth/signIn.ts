import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import apiClient from "@/lib/apiClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "허용되지 않는 메서드입니다.",
    });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "이메일과 비밀번호를 입력해주세요.",
      });
    }

    // 백엔드 API 호출
    const response = await apiClient.post("/auth/signIn", {
      email,
      password,
    });

    const { accessToken, refreshToken, user } = response.data;

    // 쿠키 설정
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

    // 반드시 응답을 보내야 함
    return res.status(200).json({
      success: true,
      message: "로그인에 성공했습니다.",
      user,
    });
  } catch (error) {
    console.error("로그인 처리 중 오류:", error);

    // 에러 발생 시에도 반드시 응답을 보내야 함
    return res.status(401).json({
      success: false,
      message: "로그인에 실패했습니다.",
      user: null,
    });
  }
}
