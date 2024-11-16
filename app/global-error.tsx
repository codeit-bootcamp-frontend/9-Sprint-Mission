"use client";

import Image from "next/image";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"], weight: "400" });

const GlobalError = ({ reset }: { reset: () => void }) => {
  const router = useRouter();
  return (
    <html lang="ko">
      <body className={`min-h-screen text-panda-gray800 ${notoSansKR.className}`}>
        <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-5">
          <div className="flex items-center space-x-3">
            <Image src="/images/globalError.png" alt="에러 아이콘" width={60} height={60} />
            <div className="flex flex-col space-y-1">
              <h1 className="font-bold">서버에서 알 수 없는 오류가 발생했습니다.</h1>
              <p className="text-sm">아래 버튼을 눌러 새로고침해보세요!</p>
            </div>
          </div>
          <button
            onClick={() =>
              startTransition(() => {
                router.refresh();
                reset();
              })
            }
            className="bg-panda-theme hover:bg-panda-theme-hover text-white px-5 py-2 rounded-md text-center transition-colors"
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
