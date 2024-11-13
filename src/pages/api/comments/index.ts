import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { cursor = null, limit = 10, productId, articleId } = req.query;

      const params: Record<string, unknown> = {
        cursor,
        limit: Number(limit),
      };

      // productId나 articleId가 있는 경우 해당 파라미터 추가
      if (productId) {
        params.productId = Number(productId);
      }
      if (articleId) {
        params.articleId = Number(articleId);
      }

      console.log("API Request Params:", params);
      const response = await apiClient.get(`/comments`, { params });

      return res.status(200).json(response.data);
    } catch (error) {
      console.error("댓글 목록 조회 실패:", error);
      return res.status(500).json({ message: "댓글 목록 조회 실패" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
