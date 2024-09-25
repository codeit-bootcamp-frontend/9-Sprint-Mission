// src/pages/api/imageProxy.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (typeof url !== "string") {
    return res.status(400).json({ error: "이미지 URL이 필요합니다." });
  }

  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "이미지를 가져오는데 실패했습니다." });
  }
}
