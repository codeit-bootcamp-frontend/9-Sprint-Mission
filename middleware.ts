// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidImageUrl } from "@/utils/imageUtils"; // 이미지 확장자 검증 함수 가져오기

// imageProxy 관련 로직을 별도 함수로 분리하여 가독성 향상
const handleImageProxy = (url: URL) => {
  const imageUrl = url.searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "이미지 URL이 필요합니다." }, { status: 400 });
  }

  if (!isValidImageUrl(imageUrl)) {
    return NextResponse.json({ error: "허용되지 않은 파일 형식입니다." }, { status: 400 });
  }

  return NextResponse.next();
};

// 미들웨어 함수
export const middleware = (request: NextRequest) => {
  const url = request.nextUrl.clone();

  // 이미지 프록시 요청 처리
  if (url.pathname.startsWith("/api/imageProxy")) {
    return handleImageProxy(url);
  }

  const accessToken = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

  // 인증이 필요한 페이지 목록 (비공개 페이지)
  const privatePages = ["/addArticle", "/addItem"];
  const isPrivatePage = privatePages.some((page) => pathname === page);
  const isAuthPage = ["/login", "/signup"].includes(pathname);

  // API 라우트에 대한 처리
  if (pathname.startsWith("/api")) {
    // /api/auth로 시작하는 경로는 모두 통과
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    // refreshToken 엔드포인트는 별도 처리
    if (pathname === "/api/auth/refreshToken") {
      return NextResponse.next();
    }

    // 토큰이 없는 경우 401 응답
    if (!accessToken) {
      return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
    }
  }

  // 로그인된 사용자가 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 비공개 페이지에 대한 접근 제어
  if (!accessToken && isPrivatePage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 다른 모든 요청 허용
  return NextResponse.next();
};

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    // API 라우트
    "/api/:path*",
    // 정적 파일을 제외한 모든 경로
    "/((?!_next|public|favicon.ico).*)",
  ],
};
