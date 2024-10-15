import axiosInstance from "@/api/axiosConfig";
import { ArticleDetail } from "@/types/article";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { articleId } = req.body;
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      // Authorization 헤더에 JWT 토큰 추가
      const response = await axiosInstance.post<ArticleDetail>(
        `/articles/${articleId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // JWT 토큰을 Bearer 형식으로 추가
          },
        }
      );
      return res
        .status(200)
        .json({ message: "게시글 좋아요 성공", articleDetail: response.data });
    } catch (error) {
      console.error("게시글 좋아요 실패:", error);
      return res.status(500).json({ message: "게시글 좋아요 실패" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
