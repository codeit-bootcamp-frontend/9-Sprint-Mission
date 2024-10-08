import axiosInstance from "@/api/axiosConfig";
import { Article, ArticleForm } from "@/types/article";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, content, image }: ArticleForm = req.body;

    // 토큰 가져오기
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      // Authorization 헤더에 JWT 토큰 추가
      const response = await axiosInstance.post<Article>(
        "/articles",
        { title, content, image },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // JWT 토큰을 Bearer 형식으로 추가
          },
        }
      );
      return res
        .status(200)
        .json({ message: "게시글 등록 성공", article: response.data });
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      return res.status(500).json({ message: "게시글 등록 실패" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
