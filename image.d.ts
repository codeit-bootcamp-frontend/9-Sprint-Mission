// 이 파일은 정적 이미지 가져오기 처리가 활성화된 경우
// next-env.d.ts에 조건부로 추가/제거됩니다.

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.ico" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}
