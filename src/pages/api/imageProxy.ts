// src/pages/api/imageProxy.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import sharp from "sharp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, width, height } = req.query;

  if (typeof url !== "string") {
    return res.status(400).json({ error: "이미지 URL이 필요합니다." });
  }

  const parsedWidth = width ? parseInt(width as string, 10) : null;
  const parsedHeight = height ? parseInt(height as string, 10) : null;

  try {
    console.log("요청된 이미지 URL:", url);
    const startTime = process.hrtime(); // 성능 측정을 위한 시작 시간 기록

    const encodedUrl = encodeURI(url);
    const response = await axios.get(encodedUrl, {
      responseType: "arraybuffer",
      timeout: 5000,
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    });

    const contentType = response.headers["content-type"];
    console.log("Content-Type:", contentType);

    if (
      !contentType ||
      (!contentType.startsWith("image/") &&
        contentType !== "image/svg+xml" &&
        contentType !== "application/octet-stream")
    ) {
      console.log("유효하지 않은 이미지 형식:", contentType);
      return res
        .status(400)
        .json({ error: "유효하지 않은 이미지 형식입니다." });
    }

    let responseData = response.data;

    // SVG 파일 크기 조절
    if (contentType === "image/svg+xml" && parsedWidth && parsedHeight) {
      console.log("SVG 이미지 처리 중...");
      const svgString = responseData.toString("utf-8");
      const updatedSvgString = svgString.replace(
        /<svg([\s\S]*?)>/,
        `<svg$1 width="${parsedWidth}" height="${parsedHeight}" preserveAspectRatio="xMidYMid meet">`
      );
      responseData = Buffer.from(updatedSvgString, "utf-8");
      console.log("SVG 이미지 크기 조절 완료");
    }
    // SVG가 아닌 다른 이미지의 크기를 조절 (sharp 사용)
    else if (parsedWidth || parsedHeight) {
      console.log("이미지 크기 조절 중... (sharp 사용)");
      const resizeStartTime = process.hrtime(); // sharp 처리 시간 기록
      responseData = await sharp(responseData)
        .resize(parsedWidth, parsedHeight)
        .toBuffer();
      const resizeEndTime = process.hrtime(resizeStartTime); // sharp 처리 시간 측정
      console.log(
        `sharp 처리 시간: ${resizeEndTime[0]}s ${resizeEndTime[1] / 1000000}ms`
      );
    }

    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Content-Type", contentType);

    const endTime = process.hrtime(startTime); // 전체 처리 시간 측정
    console.log(`전체 처리 시간: ${endTime[0]}s ${endTime[1] / 1000000}ms`);

    res.send(responseData);
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
