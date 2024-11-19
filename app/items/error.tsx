"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

const Error = ({ reset }: { reset: () => void }) => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-5">
      <div className="flex items-center space-x-3">
        <Image src="/images/globalError.png" alt="에러 아이콘" width={60} height={60} />
        <div className="flex flex-col space-y-1">
          <h1 className="font-bold">웹사이트에서 알 수 없는 오류가 발생했습니다.</h1>
          <p className="text-sm">아래 버튼을 눌러 새로고침해보세요!</p>
        </div>
      </div>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
        className="bg-panda-theme hover:bg-panda-theme-hover text-white px-5 py-2 rounded-md text-center transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
};

export default Error;