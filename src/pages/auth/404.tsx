// pages/auth/not-found.tsx
import Link from "next/link";

export default function Page404() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">
        404 - 인증 관련 페이지를 찾을 수 없습니다
      </h1>
      <p className="text-lg mb-4">죄송합니다, 찾을 수 없는 페이지입니다.</p>
      <Link href="/auth/login">
        <a className="text-blue-500 hover:underline">
          로그인 페이지로 돌아가기
        </a>
      </Link>
    </div>
  );
}
