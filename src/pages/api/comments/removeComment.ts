import axiosInstance from "@/api/axiosConfig";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { commentId } = req.body;

    // 토큰 가져오기
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      // Authorization 헤더에 JWT 토큰 추가
      const response = await axiosInstance.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // JWT 토큰을 Bearer 형식으로 추가
        },
      });
      return res.status(200).json({
        message: "댓글 삭제 성공",
        id: response.data,
      });
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      return res.status(500).json({ message: "댓글 삭제 실패" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
