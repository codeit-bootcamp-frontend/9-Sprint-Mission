import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { articleId } = req.body;
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      // Authorization 헤더에 JWT 토큰 추가
      const response = await apiClient.delete(`/articles/${articleId}/like`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // JWT 토큰을 Bearer 형식으로 추가
        },
      });

      if (response.status === 204) {
        return res.status(204).json({ message: "게시글 좋아요 취소 성공" });
      }
    } catch (error) {
      console.error("게시글 좋아요 취소 실패:", error);
      return res.status(500).json({ message: "게시글 좋아요 취소 실패" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
