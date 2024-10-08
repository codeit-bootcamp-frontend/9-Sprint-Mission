// pages/api/uploadImage.ts
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "@/api/axiosConfig";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false, // bodyParser를 비활성화하여 formidable 사용
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const form = formidable({}); // 새로운 방식으로 form 객체 생성

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("파일 업로드 실패:", err);
      return res.status(500).json({ message: "파일 업로드 실패" });
    }

    // 업로드된 파일 가져오기
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    // 쿠키에서 accessToken 가져오기
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    if (file) {
      // 파일의 읽기 스트림 생성
      const fileStream = fs.createReadStream(file.filepath);

      // form-data 패키지로 새 FormData 인스턴스 생성
      const formData = new FormData();
      formData.append("image", fileStream, {
        filename: file.originalFilename || undefined,
        contentType: file.mimetype || undefined,
      });

      try {
        // 백엔드 API로 이미지 전송
        const response = await axiosInstance.post("/images/upload", formData, {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${accessToken}`, // 인증을 위한 토큰 포함
          },
        });

        // 업로드 성공 시 URL 반환
        return res.status(200).json({
          message: "이미지 업로드 성공",
          url: response.data.url,
        });
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        return res.status(500).json({
          message: "이미지 업로드 중 오류가 발생했습니다.",
        });
      } finally {
        // 로컬 파일 삭제
        fs.unlinkSync(file.filepath);
      }
    } else {
      return res.status(400).json({ message: "파일이 없습니다." });
    }
  });
}
