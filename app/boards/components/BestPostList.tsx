"use client";

import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import { instance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { HiArrowPath } from "react-icons/hi2";

const getBestPost = async (pageSize: number) => {
  if (pageSize === 0) return [];

  try {
    const response = await instance.get(`/articles?pageSize=${pageSize}&orderBy=like`);

    if (response.status === 200) {
      return response.data.list;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("베스트 게시글 조회 실패", error.response?.data);
      throw new Error(error.response?.data.message);
    }
  }

  return [];
};

const BestPostList = () => {
  const pageSize = useCalculateWidth("best");
  const {
    data: bestPost,
    isPending,
    isError,
  } = useQuery<Post["list"], Error>({
    queryKey: ["bestPost"],
    queryFn: () => getBestPost(pageSize),
    initialData: [],
    enabled: pageSize > 0,
  });

  if (isError) {
    return <div className="text-center font-bold text-xl">게시글 조회 실패</div>;
  }

  if (isPending) {
    return (
      <div className="text-center font-bold text-xl flex items-center justify-center space-x-2">
        <HiArrowPath className="animate-spin" />
        게시글 목록을 가져오고 있습니다.
      </div>
    );
  }

  return bestPost.map((post) => (
    <Link
      href={`/board/${post.id}`}
      key={post.id}
      className="flex flex-col space-y-4 bg-panda-gray50 px-6 pb-4 rounded-lg"
    >
      <div className="bg-panda-theme flex items-center justify-center space-x-1 w-[102px] rounded-bl-2xl rounded-br-2xl px-6 py-[2px]">
        <Image src="/icons/ic_medal.svg" alt="메달" width={16} height={16} />
        <span className="text-white font-semibold">Best</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg leading-7 w-44">{post.content}</p>
        <div className="bg-white w-[72px] h-[72px] flex items-center justify-center rounded-lg border-[0.75px] border-panda-gray200">
          <Image
            src={post.image || "/icons/question.png"}
            alt="제품 사진"
            width={48}
            height={48}
            priority={true}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-panda-gray600">{post.writer.nickname}</p>
          <div className="flex items-center space-x-1">
            <Image src="/icons/ic_heart.svg" alt="좋아요" width={16} height={16} />
            <span className="text-sm text-panda-gray600">{post.likeCount}</span>
          </div>
        </div>
        <p className="text-sm text-panda-gray400">{post.createdAt.split("T")[0]}</p>
      </div>
    </Link>
  ));
};

export default BestPostList;
