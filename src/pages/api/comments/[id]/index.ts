import apiClient from "@/lib/apiClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // commentId

  if (req.method === "PATCH") {
    const { content } = req.body;
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      const response = await apiClient.patch(
        `/comments/${id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.status(200).json({
        message: "댓글 수정 성공",
        comment: response.data,
      });
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      return res.status(500).json({ message: "댓글 수정 실패" });
    }
  } else if (req.method === "DELETE") {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    try {
      const response = await apiClient.delete(`/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
