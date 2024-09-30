"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen space-y-5">
      <div className="flex flex-col items-center justify-center space-y-3 md:flex-row md:space-x-3">
        <Image src="/icons/error.png" alt="에러" width={80} height={80} className="md:w-12 md:h-12" />
        <h2 className="text-xl font-bold text-center md:text-3xl">오류가 발생했습니다. 아래를 확인해주세요.</h2>
      </div>
      <ul className="leading-6 md:text-xl md:leading-8">
        <li>입력하신 경로가 잘못됐을 수 있으니 확인해주세요.</li>
      </ul>
      <button onClick={() => router.push("/")} className="px-6 py-3 bg-[--color-theme] text-white rounded-lg font-semibold transition-all hover:bg-[--color-theme-hover]">메인으로 돌아가기</button>
    </div>
  )
}

export default NotFound;