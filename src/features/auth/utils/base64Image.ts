// 이미지 파일을 Base64 문자열로 변환하는 함수
export const getBase64Image = (imgUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // 크로스 오리진 이슈 방지
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      } else {
        reject(new Error("Canvas context is null"));
      }
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = imgUrl;
  });
};
