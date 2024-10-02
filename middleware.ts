// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidImageUrl } from "@/utils/imageUtils"; // 이미지 확장자 검증 함수 가져오기

// 미들웨어 함수
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // /api/imageProxy 경로에 대한 요청만 처리
  if (url.pathname.startsWith("/api/imageProxy")) {
    const imageUrl = url.searchParams.get("url");

    // 이미지 URL이 없는 경우 에러 반환
    if (!imageUrl) {
      return NextResponse.json(
        { error: "이미지 URL이 필요합니다." },
        { status: 400 }
      );
    }

    // isValidImageUrl 함수 사용하여 확장자 검증
    if (!isValidImageUrl(imageUrl)) {
      return NextResponse.json(
        { error: "허용되지 않은 파일 형식입니다." },
        { status: 400 }
      );
    }
  }

  // 다른 요청에 대해 계속 처리
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: "/api/imageProxy",
};
