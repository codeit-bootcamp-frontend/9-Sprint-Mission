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

    // GET 요청 처리
    if (req.method === "GET") {
      const response = await apiClient.get<MeResponse>("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.status(200).json(response.data);
    }

    // PATCH 요청 처리
    if (req.method === "PATCH") {
      const { image } = req.body;

      const response = await apiClient.patch<MeResponse>("/users/me", {
        data: { image },
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
