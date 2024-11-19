import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET 요청 처리 (상품 목록 조회)
  if (req.method === "GET") {
    try {
      const { page = 1, pageSize = 10, orderBy = "recent", category, search } = req.query;
      const limit = Number(pageSize);

      const params: Record<string, unknown> = {
        orderBy,
        pageSize: limit,
      };

      if (page) {
        params.page = Number(page);
      }
      if (category) {
        params.category = category;
      }
      if (search) {
        params.search = search;
      }

      console.log("API Request Params:", params);
      const response = await apiClient.get(`/products`, { params });
      return res.status(200).json(response.data);
    } catch (error) {
      console.error("상품 목록 조회 실패:", error);
      return res.status(500).json({ message: "상품 목록 조회 실패" });
    }
  }

  // POST 요청 처리 (상품 추가)
  if (req.method === "POST") {
    const { name, description, price, tags, images } = req.body;
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      const response = await apiClient.post(
        "/products",
        { name, description, price, tags, images },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.status(200).json({ message: "상품 등록 성공", product: response.data });
    } catch (error) {
      console.error("상품 등록 실패:", error);
      return res.status(500).json({ message: "상품 등록 실패" });
    }
  }

  // 허용되지 않은 메서드 처리
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
