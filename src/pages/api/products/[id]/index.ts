import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // GET 요청 처리 (상품 상세 조회)
  if (req.method === "GET") {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return res.status(200).json(response.data);
    } catch (error) {
      console.error("상품 상세 조회 실패:", error);
      return res.status(500).json({ message: "상품 상세 조회 실패" });
    }
  }

  // PATCH 요청 처리 (상품 수정)
  if (req.method === "PATCH") {
    const { name, description, price, tags, images } = req.body;
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      const response = await apiClient.patch(
        `/products/${id}`,
        { name, description, price, tags, images },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.status(200).json({ message: "상품 수정 성공", product: response.data });
    } catch (error) {
      console.error("상품 수정 실패:", error);
      return res.status(500).json({ message: "상품 수정 실패" });
    }
  }

  // DELETE 요청 처리 (상품 삭제)
  if (req.method === "DELETE") {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      await apiClient.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.status(200).json({ message: "상품 삭제 성공" });
    } catch (error) {
      console.error("상품 삭제 실패:", error);
      return res.status(500).json({ message: "상품 삭제 실패" });
    }
  }

  // 허용되지 않은 메서드 처리
  res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
