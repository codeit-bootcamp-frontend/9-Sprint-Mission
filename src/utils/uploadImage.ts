// utils/uploadImage.ts (클라이언트에서 호출하는 함수)
import axios from "axios";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("/api/uploadImage", formData);

  if (response.status !== 200) {
    throw new Error("이미지 업로드 실패");
  }

  const data = await response.data;
  return data; // 업로드된 이미지의 URL 반환
};
