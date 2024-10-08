// utils/imageUtils.ts

// 허용된 이미지 확장자 목록
export const allowedExtensions = ["jpeg", "jpg", "png", "gif", "svg"];

// 이미지 URL이 허용된 확장자를 가지고 있는지 확인하는 함수
export const isValidImageUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const extension = pathname.split(".").pop()?.toLowerCase();
    return extension ? allowedExtensions.includes(extension) : false;
  } catch (error) {
    console.error("URL 파싱 중 오류:", error);
    return false;
  }
};
