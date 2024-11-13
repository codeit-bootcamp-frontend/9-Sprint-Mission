import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return res.status(200).json(response.data);
    } catch (error) {
      console.error("상품 상세 조회 실패:", error);
      return res.status(500).json({ message: "상품 상세 조회 실패" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
