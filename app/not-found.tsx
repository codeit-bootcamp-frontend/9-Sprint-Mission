"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-5">
      <div className="flex items-center space-x-3">
        <Image src={"/images/404.png"} alt="404 아이콘" width={60} height={60} />
        <div className="flex flex-col space-y-1">
          <h1 className="font-bold">페이지를 찾을 수 없습니다.</h1>
          <p className="text-sm">경로를 다시 한번 확인해주세요!</p>
        </div>
      </div>
      <button
        onClick={() => router.push("/")}
        className="bg-panda-theme hover:bg-panda-theme-hover text-white px-5 py-2 rounded-md text-center transition-colors"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
};

export default NotFound;