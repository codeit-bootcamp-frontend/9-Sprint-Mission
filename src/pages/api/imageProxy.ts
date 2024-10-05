// src/pages/api/imageProxy.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import sharp from "sharp";
import Cors from "cors";

// CORS 미들웨어 초기화
// 해당 API는 외부에서 호출될 수 있으므로, CORS 설정을 통해 허용할 HTTP 메서드를 제한함
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// CORS 미들웨어를 실행하는 함수
// runMiddleware 함수는 기존 미들웨어 함수를 프로미스로 변환하여 비동기적으로 처리할 수 있도록 함
// fn 함수는 NextApiRequest, NextApiResponse와 콜백을 인자로 받음
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (
    req: NextApiRequest,
    res: NextApiResponse,
    callback: (result?: Error) => void
  ) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    // fn 미들웨어 함수 실행 후 콜백을 통해 결과 처리
    fn(req, res, (result?: Error) => {
      if (result instanceof Error) {
        // 만약 에러가 발생하면 해당 에러를 reject로 전달
        return reject(result);
      }
      // 에러가 없다면 프로미스 성공 처리
      return resolve();
    });
  });
}

// 실제 API 요청을 처리하는 메인 핸들러 함수
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // API 요청에 대해 CORS 미들웨어 실행
  await runMiddleware(req, res, cors);

  // 쿼리 파라미터로부터 이미지 URL과 크기(너비, 높이)를 가져옴
  const { url, width, height } = req.query;

  // 이미지 URL이 제공되지 않은 경우 에러 반환
  if (typeof url !== "string") {
    return res.status(400).json({ error: "이미지 URL이 필요합니다." });
  }

  // 너비와 높이를 정수로 파싱
  const parsedWidth = width ? parseInt(width as string, 10) : undefined;
  const parsedHeight = height ? parseInt(height as string, 10) : undefined;

  // 너비 값이 유효하지 않은 경우 에러 반환
  if (parsedWidth !== undefined && isNaN(parsedWidth)) {
    return res.status(400).json({ error: "유효한 너비 값이 필요합니다." });
  }
  // 높이 값이 유효하지 않은 경우 에러 반환
  if (parsedHeight !== undefined && isNaN(parsedHeight)) {
    return res.status(400).json({ error: "유효한 높이 값이 필요합니다." });
  }

  try {
    // 이미지 URL을 인코딩하여 Axios로 요청
    const encodedUrl = encodeURI(url);
    const response = await axios.get(encodedUrl, {
      responseType: "arraybuffer", // 이미지 데이터를 이진 데이터로 받음
      timeout: 5000, // 5초 타임아웃 설정
      validateStatus: function (status) {
        // 200번대 응답만 유효한 상태로 처리
        return status >= 200 && status < 300;
      },
    });

    // 콘텐츠 타입을 가져옴
    const contentType = response.headers["content-type"];

    // 유효하지 않은 이미지 형식인 경우 에러 반환
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

    // 이미지를 저장할 변수
    let responseData = response.data;

    // SVG 이미지일 경우 너비와 높이 값이 지정되어 있으면 SVG 태그 내부의 width, height 속성을 수정함
    if (
      contentType === "image/svg+xml" &&
      parsedWidth !== undefined &&
      parsedHeight !== undefined
    ) {
      // SVG 파일을 문자열로 변환하여 태그 수정
      const svgString = responseData.toString("utf-8");
      const updatedSvgString = svgString.replace(
        /<svg([\s\S]*?)>/,
        `<svg$1 width="${parsedWidth}" height="${parsedHeight}" preserveAspectRatio="xMidYMid meet">`
      );
      // 수정된 SVG 문자열을 다시 버퍼로 변환
      responseData = Buffer.from(updatedSvgString, "utf-8");
    }
    // SVG 외의 이미지일 경우 sharp 라이브러리를 사용하여 크기 조정
    else if (parsedWidth !== undefined || parsedHeight !== undefined) {
      try {
        // sharp 라이브러리를 사용하여 이미지의 크기를 조정하고 버퍼로 변환
        responseData = await sharp(responseData)
          .resize(parsedWidth, parsedHeight)
          .toBuffer();
      } catch (err) {
        console.error("sharp 에러:", err);
        throw err;
      }
    }

    // 캐시 제어 헤더 설정 (s-maxage: 24시간, stale-while-revalidate 적용)
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    // 콘텐츠 타입 설정
    res.setHeader("Content-Type", contentType);
    // 최종적으로 이미지 데이터를 응답으로 전송
    res.send(responseData);
  } catch (error) {
    console.error("이미지 로드 에러:", error);
    if (axios.isAxiosError(error)) {
      // 만약 요청한 이미지가 없으면 404 에러 반환
      if (error.response?.status === 404) {
        return res.status(404).json({ error: "이미지를 찾을 수 없습니다." });
      }
      // 기타 HTTP 상태에 따른 에러 처리
      const status = error.response?.status || 500;
      const message =
        error.response?.statusText || "이미지를 가져오는데 실패했습니다.";
      res.status(status).json({ error: message });
    } else {
      // 그 외의 일반 에러 처리
      res.status(500).json({ error: "이미지를 가져오는데 실패했습니다." });
    }
  }
}
