// src/pages/api/imageProxy.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import sharp from "sharp";
import Cors from "cors";

// CORS 미들웨어 초기화
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// CORS 미들웨어 실행 함수
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: NextApiRequest, res: NextApiResponse, callback: (result?: Error) => void) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result?: Error) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

// 허용되지 않는 도메인 목록
const ALLOWED_DOMAINS = ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // CORS 미들웨어 실행
    await runMiddleware(req, res, cors);

    if (req.method !== "GET") {
      return res.status(405).json({ error: "GET 메서드만 허용됩니다." });
    }

    const { url: encodedUrl, w, q } = req.query;

    if (typeof encodedUrl !== "string") {
      return res.status(400).json({ error: "이미지 URL이 필요합니다." });
    }

    // URL 디코딩 및 검증
    const url = decodeURIComponent(encodedUrl);
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url);
      if (!ALLOWED_DOMAINS.includes(parsedUrl.hostname)) {
        console.error("허용되지 않는 도메인:", parsedUrl.hostname);
        return res.status(400).json({
          error: "허용되지 않는 도메인입니다.",
          hostname: parsedUrl.hostname,
        });
      }
    } catch (error) {
      console.error("URL 파싱 에러:", error);
      return res.status(400).json({ error: "유효하지 않은 URL 형식입니다." });
    }

    const width = w ? parseInt(w as string, 10) : undefined;
    const quality = q ? parseInt(q as string, 10) : undefined;

    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
        timeout: 5000,
        headers: {
          Accept: "image/*",
        },
      });

      const contentType = response.headers["content-type"];

      // Content-Type 검증 로직 수정
      const isValidImageType = contentType?.startsWith("image/") || contentType === "application/octet-stream";

      if (!isValidImageType) {
        console.error("유효하지 않은 Content-Type:", contentType);
        return res.status(400).json({
          error: "유효하지 않은 이미지 형식입니다.",
          contentType,
        });
      }

      let imageBuffer = response.data;

      // sharp를 사용하여 이미지 유효성 검증 및 처리
      try {
        const sharpInstance = sharp(imageBuffer);

        if (width) {
          sharpInstance.resize({
            width,
            withoutEnlargement: true,
            fit: "contain",
          });
        }

        if (quality) {
          sharpInstance.jpeg({ quality });
        }

        imageBuffer = await sharpInstance.toBuffer();

        // 이미지가 성공적으로 처리되면 JPEG로 응답
        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Cache-Control", "public, s-maxage=31536000, stale-while-revalidate");
        return res.send(imageBuffer);
      } catch (sharpError) {
        console.error("이미지 처리 에러:", sharpError);
        return res.status(400).json({
          error: "유효하지 않은 이미지 데이터입니다.",
          details: sharpError instanceof Error ? sharpError.message : "알 수 없는 오류",
        });
      }
    } catch (error) {
      console.error("이미지 가져오기 에러:", error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const message = error.response?.statusText || "이미지를 가져오는데 실패했습니다.";
        return res.status(status).json({
          error: message,
          details: error.message,
          url: url,
        });
      }
      return res.status(500).json({ error: "이미지 처리 중 오류가 발생했습니다." });
    }
  } catch (error) {
    console.error("예상치 못한 에러:", error);
    return res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};
