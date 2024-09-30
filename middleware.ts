import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import allowedDomains from "./allowedDomains";

const allowedImageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/api/imageProxy")) {
    const imageUrl = url.searchParams.get("url");
    if (!imageUrl) {
      return NextResponse.json(
        { error: "이미지 URL이 필요합니다." },
        { status: 400 }
      );
    }

    try {
      const urlObj = new URL(imageUrl);
      if (!allowedDomains.includes(urlObj.hostname)) {
        return NextResponse.json(
          { error: "허용되지 않은 도메인입니다." },
          { status: 403 }
        );
      }

      const extension = imageUrl.split(".").pop()?.toLowerCase();
      if (!extension || !allowedImageExtensions.includes(extension)) {
        return NextResponse.json(
          { error: "허용되지 않은 파일 형식입니다." },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "유효하지 않은 URL입니다." },
        { status: 400 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/imageProxy",
};
