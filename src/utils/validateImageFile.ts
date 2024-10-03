// src/utils/validateImageFile.ts
/**
 * 이미지 파일 확장자가 유효한지 확인하는 함수
 * @param {File} file - 업로드할 파일 객체
 * @returns {boolean} 이미지 파일이면 true, 아니면 false
 */
export const isValidImageFile = (file: File): boolean => {
  // 허용할 이미지 확장자 목록에 SVG 추가
  const validExtensions = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];

  return validExtensions.includes(file.type);
};
