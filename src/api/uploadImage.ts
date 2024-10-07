// src/api/uploadImage.js
import axiosInstance from "./axiosConfig";

/**
 * 이미지 파일을 업로드하고, 서버로부터 업로드된 이미지의 URL을 반환
 * @param {File} imageFile - 업로드할 이미지 파일
 * @returns {Promise<string>} 업로드된 이미지의 URL을 반환하는 Promise
 * @throws {Error} 업로드 실패 시 에러
 */
export const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};
