"use client";

import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiArrowPath } from "react-icons/hi2";
import Pagination from "@/components/Pagination";
import { useAtomValue } from "jotai";
import { boardsAtom, boardsOrderByAtom } from "@/atom/boardsAtom";
import { instance } from "@/lib/axios";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Post } from "../types/post";

const getAllPosts = async (pageSize: number, orderBy: string, page: number) => {
  if (pageSize === 0) return { list: [], totalCount: 0 };

  try {
    const response = await instance.get(
      `/articles?pageSize=${pageSize}&orderBy=${orderBy}&page=${page}`
    );

    if (response.status === 200) {
      const { list, totalCount } = response.data;
      return { list, totalCount };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("전체 게시글 조회 실패", error.response?.data);
      throw new Error(error.response?.data.message);
    }
  }

  return { list: [], totalCount: 0 };
};

const AllPostList = () => {
  const pageSize = useCalculateWidth("all");
  const orderBy = useAtomValue(boardsOrderByAtom);
  const searchRequest = useAtomValue(boardsAtom);
  const isMobile = pageSize === 4;
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const {
    data: allPosts,
    isPending,
    error,
  } = useQuery<{ list: Post["list"]; totalCount: Post["totalCount"] }, Error>({
    queryKey: ["allPosts", page, orderBy],
    queryFn: () => getAllPosts(pageSize, orderBy, page),
    initialData: { list: [], totalCount: 0 },
    enabled: pageSize > 0,
  });

  useEffect(() => {
    if (pageSize > 0) {
      queryClient.prefetchQuery({
        queryKey: ["allPosts", page, orderBy],
        queryFn: () => getAllPosts(pageSize, orderBy, page),
      });
    }
  }, [queryClient, page, orderBy, pageSize]);

  useEffect(() => {
    if (allPosts) {
      setTotalPage(Math.ceil(allPosts.totalCount / pageSize));
    }
  }, [allPosts, pageSize]);

  if (isPending) {
    return (
      <div className="text-center font-bold text-xl flex items-center justify-center space-x-2">
        <HiArrowPath className="animate-spin" />
        게시글 목록을 가져오고 있습니다.
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center font-bold text-xl flex items-center justify-center space-x-2">
        {error.message}
      </div>
    );
  }

  return (
    <>
      {(searchRequest.length > 0 ? searchRequest : allPosts.list).map((post) => (
        <Link
          key={post.id}
          href={`/board/${post.id}`}
          className="flex flex-col space-y-4 bg-[#FCFCFC] pb-6 border-b-[1px] border-panda-gray200"
        >
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold w-[263px] md:w-[616px]">{post.content}</p>
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
              <Image src="/icons/sessionBtn.png" alt="회원프로필" width={24} height={24} />
              <div className="flex items-center space-x-2">
                <h3 className="text-sm text-panda-gray600">{post.writer.nickname}</h3>
                <span className="text-sm text-panda-gray400">{post.createdAt.split("T")[0]}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Image src="/icons/ic_heart.svg" alt="좋아요" width={24} height={24} />
              <span className="text-panda-gray500">{post.likeCount}</span>
            </div>
          </div>
        </Link>
      ))}
      <Pagination totalPage={totalPage} page={page} setPage={setPage} isMobile={isMobile} />
    </>
  );
};

export default AllPostList;
