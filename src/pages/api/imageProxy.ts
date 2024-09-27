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
    const encodedUrl = encodeURI(url);
    const response = await axios.get(encodedUrl, {
      responseType: "arraybuffer",
      timeout: 5000,
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    });

    const contentType = response.headers["content-type"];
    if (
      !contentType ||
      (!contentType.startsWith("image/") &&
        contentType !== "image/svg+xml" &&
        contentType !== "application/octet-stream")
    ) {
      return res
        .status(400)
        .json({ error: "유효하지 않은 이미지 형식입니다." });
    }

    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Content-Type", contentType);
    res.send(response.data);
  } catch (error) {
    console.error("이미지 로드 에러:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return res.status(404).json({ error: "이미지를 찾을 수 없습니다." });
      }
      const status = error.response?.status || 500;
      const message =
        error.response?.statusText || "이미지를 가져오는데 실패했습니다.";
      res.status(status).json({ error: message });
    } else {
      res.status(500).json({ error: "이미지를 가져오는데 실패했습니다." });
    }
  }
}
