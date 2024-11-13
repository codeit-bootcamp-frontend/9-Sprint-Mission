import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.cookies.accessToken;

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!accessToken) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  try {
    const { articleId } = req.body;

    const response = await apiClient.delete(`/articles/${articleId}/like`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("좋아요 취소 실패:", error);
    return res.status(500).json({ message: "좋아요 취소에 실패했습니다." });
  }
}
