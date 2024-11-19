import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET 요청 처리 (게시글 목록 조회)
  if (req.method === "GET") {
    try {
      const { page = 1, pageSize = 10, orderBy = "recent" } = req.query;
      const limit = Number(pageSize);

      const params: Record<string, unknown> = {
        orderBy,
        pageSize: limit,
      };

      if (page) {
        params.page = Number(page);
      }

      const response = await apiClient.get(`/articles`, { params });
      return res.status(200).json(response.data);
    } catch (error) {
      console.error("게시글 목록 조회 실패:", error);
      return res.status(500).json({ message: "게시글 목록 조회 실패" });
    }
  }

  // POST 요청 처리 (게시글 추가)
  if (req.method === "POST") {
    const { title, content, image } = req.body;
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      // 요청 데이터 구성
      const requestData: Record<string, unknown> = {
        title,
        content,
      };

      // image가 있는 경우에만 추가
      if (image && image !== "") {
        requestData.image = image;
      }

      const response = await apiClient.post("/articles", requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.status(200).json({ message: "게시글 등록 성공", article: response.data });
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      return res.status(500).json({ message: "게시글 등록 실패" });
    }
  }

  // 허용되지 않은 메서드 처리
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
