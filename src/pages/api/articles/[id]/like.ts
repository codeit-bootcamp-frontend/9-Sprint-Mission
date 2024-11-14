import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  // POST 요청 처리 (좋아요 추가)
  if (req.method === "POST") {
    try {
      const response = await apiClient.post(
        `/articles/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        return res.status(200).json({ message: "게시글 좋아요 성공" });
      }
    } catch (error) {
      console.error("게시글 좋아요 실패:", error);
      return res.status(500).json({ message: "게시글 좋아요 실패" });
    }
  }

  // DELETE 요청 처리 (좋아요 취소)
  if (req.method === "DELETE") {
    try {
      const response = await apiClient.delete(`/articles/${id}/like`, {
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

  // 허용되지 않은 메서드 처리
  res.setHeader("Allow", ["POST", "DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
