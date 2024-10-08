import axiosInstance from "@/api/axiosConfig";
import { Comment } from "@/types/comment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { productId, content } = req.body;

    // 토큰 가져오기
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      // Authorization 헤더에 JWT 토큰 추가
      const response = await axiosInstance.post<Comment>(
        `/products/${productId}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // JWT 토큰을 Bearer 형식으로 추가
          },
        }
      );
      return res
        .status(200)
        .json({ message: "상품 댓글 등록 성공", comment: response.data });
    } catch (error) {
      console.error("상품 댓글 등록 실패:", error);
      return res.status(500).json({ message: "상품 댓글 등록 실패" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
