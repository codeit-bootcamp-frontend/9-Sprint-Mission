"use client";

import PostList from "@/components/boards/PostList";
import SearchForm from "@/components/boards/SearchForm";
import Image from "next/image";
import Link from "next/link";

const Boards = () => {
  return (
    <div className="p-6 mt-24 flex flex-col space-y-6 justify-center lg:w-[1200px] lg:m-auto lg:mt-24 lg:p-0">
      <h2 className="text-lg font-bold">베스트 게시글</h2>
      <div className="md:grid md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6">
        <div className="flex flex-col space-y-4 bg-[--color-gray50] px-6 pb-4 rounded-lg">
          <div className="bg-[--color-theme] flex items-center justify-center space-x-1 w-[102px] rounded-bl-2xl rounded-br-2xl px-6 py-[2px]">
            <Image src="/icons/ic_medal.svg" alt="메달" width={16} height={16} />
            <span className="text-white font-semibold">Best</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-lg leading-7 w-44">
              맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
            </p>
            <div className="bg-white w-[72px] h-[72px] flex items-center justify-center rounded-lg border-[0.75px] border-[--color-gray200]">
              <Image src="/images/laptop.png" alt="랩톱" width={48} height={48} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-[#4B5563]">총명한판다</p>
              <div className="flex items-center space-x-1">
                <Image src="/icons/ic_heart.svg" alt="좋아요" width={16} height={16} />
                <span className="text-sm text-[#4B5563]">9999+</span>
              </div>
            </div>
            <p className="text-sm text-[--color-gray400]">2024. 04. 16</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">게시글</h2>
          <Link
            href="/addboard"
            className="bg-[--color-theme] text-white px-6 py-3 font-semibold rounded-lg"
          >
            글쓰기
          </Link>
        </div>
        <SearchForm />
        <PostList />
      </div>
    </div>
  );
};

export default Boards;
