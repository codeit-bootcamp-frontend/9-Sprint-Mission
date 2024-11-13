import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { page = 1, pageSize = 10, orderBy = "recent" } = req.query;

    // orderBy에 따른 pageSize 처리
    const limit = Number(pageSize);

    const params: Record<string, unknown> = {
      orderBy,
      pageSize: limit,
    };

    if (page) {
      params.page = Number(page);
    }

    console.log("API Request Params:", params);
    const response = await apiClient.get(`/articles`, { params });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("게시글 목록 조회 실패:", error);
    return res.status(500).json({ message: "게시글 목록 조회 실패" });
  }
}
