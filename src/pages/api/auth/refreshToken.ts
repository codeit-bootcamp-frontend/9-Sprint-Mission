// src/pages/api/auth/refreshToken.ts
import axiosInstance from "@/api/axiosConfig";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { User, RefreshTokenResponse } from "@/types/auth";
import { AxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RefreshTokenResponse>
) {
  if (req.method === "POST") {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(200).json({
        isLogin: false,
        message: "로그인이 필요합니다.",
        status: 404,
      });
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

      try {
        const userResponse = await axiosInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const user = userResponse.data as User;

        return res.status(200).json({
          isLogin: true,
          message: "자동 로그인에 성공했습니다.",
          user,
          status: 200,
        });
      } catch (userError) {
        console.error("사용자 정보 조회 실패:", userError);
        return res.status(200).json({
          isLogin: false,
          message: "자동 로그인에 실패했습니다. 다시 로그인해주세요.",
          status: 401,
        });
      }
    } catch (error) {
      console.error("토큰 갱신 실패:", error);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return res.status(200).json({
            isLogin: false,
            message: "자동 로그인에 실패했습니다. 다시 로그인해주세요.",
            status: 401,
          });
        } else if (error.response?.status === 500) {
          const errorMessage =
            error.response.data.message || "서버 오류가 발생했습니다.";
          return res.status(200).json({
            isLogin: false,
            message: errorMessage,
            status: 500,
          });
        }
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      isLogin: false,
      message: `Method ${req.method} Not Allowed`,
      status: 405,
    });
  }
}
