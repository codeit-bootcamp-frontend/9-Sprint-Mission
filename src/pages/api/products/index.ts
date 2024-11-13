import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { page = 1, pageSize = 10, orderBy = "recent", category, search } = req.query;

    const params: Record<string, unknown> = {
      orderBy,
      pageSize: Number(pageSize),
      page: Number(page),
    };

    // 카테고리나 검색어가 있는 경우 해당 파라미터 추가
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
