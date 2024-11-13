import apiClient from "@/lib/apiClient";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // articleId

  if (req.method === "GET") {
    try {
      const { cursor = null, limit = 10 } = req.query;
      const response = await apiClient.get(`/articles/${id}/comments`, {
        params: {
          cursor: cursor ? Number(cursor) : null,
          limit: Number(limit),
        },
      });

      return res.status(200).json(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // 자세한 에러 정보 로깅
        console.error("게시글 댓글 목록 조회 실패 상세:");
        console.error("Error status:", error.response?.status);
        console.error("Error message:", error.response?.data);
        console.error("Error details:", error);

        return res.status(error.response?.status || 500).json({
          message: "게시글 댓글 목록 조회 실패",
          error: error.response?.data || error.message,
        });
      }

      console.error("게시글 댓글 목록 조회 실패:", error);
      return res.status(500).json({ message: "게시글 댓글 목록 조회 실패" });
    }
  } else if (req.method === "POST") {
    try {
      const { content } = req.body;
      const { accessToken } = req.cookies;

      if (!accessToken) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
      }

      const response = await apiClient.post(
        `/articles/${id}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.status(200).json(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("게시글 댓글 등록 실패:", error.response?.data);
        return res.status(error.response?.status || 500).json({
          message: "게시글 댓글 등록 실패",
          error: error.response?.data || error.message,
        });
      }

      console.error("게시글 댓글 등록 실패:", error);
      return res.status(500).json({ message: "게시글 댓글 등록 실패" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
