// src/utils/cleanSVG.ts
/**
 * SVG 파일에서 위험한 태그를 제거하고 안전하게 필터링된 SVG 파일의 Blob URL을 반환
 * @param {File} file - 업로드할 SVG 파일 객체
 * @returns {Promise<string | null>} 안전하게 처리된 SVG 파일의 Blob URL을 반환하는 Promise
 */
export const cleanSVG = async (file: File): Promise<string | null> => {
  try {
    const text = await file.text();

    // SVG 파일을 파싱
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(text, "image/svg+xml");

    // 필터링할 태그 목록
    const forbiddenTags = ["script", "iframe", "foreignObject"];

    // SVG 문서 내에서 금지된 태그들을 검색하고 제거
    forbiddenTags.forEach((tag) => {
      const elements = svgDoc.getElementsByTagName(tag);
      for (let i = elements.length - 1; i >= 0; i--) {
        elements[i].parentNode?.removeChild(elements[i]);
      }
    });

    // 필터링된 SVG 내용을 텍스트로 변환 후 Blob 생성
    const cleanedSVG = new Blob([svgDoc.documentElement.outerHTML], {
      type: "image/svg+xml",
    });
    return URL.createObjectURL(cleanedSVG);
  } catch (error) {
    console.error("SVG 파일 필터링 중 오류 발생:", error);
    return null;
  }
};
