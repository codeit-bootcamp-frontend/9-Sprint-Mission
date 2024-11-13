import apiClient from "@/lib/apiClient";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const response = await apiClient.get(`/comments/${id}`);
      return res.status(200).json(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("댓글 상세 조회 실패:", error.response?.data);
        return res.status(error.response?.status || 500).json({
          message: "댓글 상세 조회 실패",
          error: error.response?.data || error.message,
        });
      }
      console.error("댓글 상세 조회 실패:", error);
      return res.status(500).json({ message: "댓글 상세 조회 실패" });
    }
  } else if (req.method === "PATCH") {
    try {
      const { content } = req.body;
      const { accessToken } = req.cookies;

      if (!accessToken) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
      }

      const response = await apiClient.patch(
        `/comments/${id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.status(200).json(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("댓글 수정 실패:", error.response?.data);
        return res.status(error.response?.status || 500).json({
          message: "댓글 수정 실패",
          error: error.response?.data || error.message,
        });
      }
      console.error("댓글 수정 실패:", error);
      return res.status(500).json({ message: "댓글 수정 실패" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { accessToken } = req.cookies;

      if (!accessToken) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
      }

      const response = await apiClient.delete(`/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.status(200).json(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("댓글 삭제 실패:", error.response?.data);
        return res.status(error.response?.status || 500).json({
          message: "댓글 삭제 실패",
          error: error.response?.data || error.message,
        });
      }
      console.error("댓글 삭제 실패:", error);
      return res.status(500).json({ message: "댓글 삭제 실패" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
