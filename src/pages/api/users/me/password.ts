import apiClient from "@/lib/apiClient";
import { MeResponse } from "@/types/auth";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    // PATCH 요청만 허용
    if (req.method === "PATCH") {
      const { currentPassword, newPassword } = req.body;

      // 필수 필드 확인
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message: "현재 비밀번호와 새로운 비밀번호를 모두 입력해주세요.",
        });
      }

      const response = await apiClient.patch<MeResponse>("/users/me/password", {
        data: {
          currentPassword,
          newPassword,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.status(200).json(response.data);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      return res.status(status ?? 500).json({ message: error.response?.data.message });
    }
  }
}
