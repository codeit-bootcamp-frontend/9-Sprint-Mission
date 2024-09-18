//이미지 파일 인식 설정

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png";
declare module "*.jpg";
