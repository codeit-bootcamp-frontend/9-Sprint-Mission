"use client";

import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Post } from "../types/post";
import { allPost } from "../actions/allPost";
import toast from "react-hot-toast";
import { HiArrowPath } from "react-icons/hi2";
import Pagination from "@/components/Pagination";
import { useAtomValue } from "jotai";
import { boardsOrderByAtom } from "@/atom/boardsAtom";

const AllPostList = () => {
  const pageSize = useCalculateWidth("all");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const orderBy = useAtomValue(boardsOrderByAtom);
  const [allPosts, setAllPosts] = useState<Post["list"]>([]);
  const [isPending, setIsPending] = useState(false);
  const isMobile = pageSize === 4;

  const getAllPosts = useCallback(async () => {
    try {
      setIsPending(true);
      const response = await allPost(pageSize, orderBy, page);

      if (response && response.list) {
        setAllPosts(response.list);
        setTotalPage(Math.ceil(response.totalCount / pageSize));
      }
    } catch (error) {
      console.error("전체 게시글 조회 실패", error);
      toast.error("전체 게시글 조회 실패");
    } finally {
      setIsPending(false);
    }
  }, [pageSize, orderBy, page]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  if (isPending) {
    return (
      <div className="text-center font-bold text-xl flex items-center justify-center space-x-2">
        <HiArrowPath className="animate-spin" />
        게시글 목록을 가져오고 있습니다.
      </div>
    );
  }

  return (
    <>
      {allPosts.map((post) => (
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
