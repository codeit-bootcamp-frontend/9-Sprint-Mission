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
    // URL 인코딩 처리
    const encodedUrl = encodeURI(url);

    // 외부 이미지를 가져오기
    const response = await axios.get(encodedUrl, {
      responseType: "arraybuffer",
    });

    // CORS 헤더 추가 (Vercel에서 외부 요청 시 필요할 수 있음)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

    // Content-Type 설정
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (error) {
    console.error("이미지 로드 에러:", error);
    res.status(500).json({ error: "이미지를 가져오는데 실패했습니다." });
  }
}
