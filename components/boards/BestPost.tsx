"use client";

import Link from "next/link";
import SearchForm from "./SearchForm";
import { useCallback, useEffect, useState } from "react";
import { instance } from "@/lib/axios";
import { ISearchList } from "@/types/boardsTypeShare";
import axios from "axios";
import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import toast from "react-hot-toast";
import BestPostContents from "./BestPostContents";

const BestPost = () => {
  const pageSize: number = useCalculateWidth("best");

  const [bestPost, setBestPost] = useState<ISearchList[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getBestPosts = useCallback(async () => {
    if (pageSize === 0 || pageSize === Infinity) return null;

    try {
      setLoading(true);
      const response = await instance.get(`/articles?pageSize=${pageSize}&orderBy=like`);

      if (response.status === 200) {
        setBestPost(response.data.list);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("자유게시판 베스트게시글 getBestPosts에서 api 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    getBestPosts();
  }, [getBestPosts]);

  return (
    <>
      <h2 className="text-lg font-bold">베스트 게시글</h2>
      <div className="md:grid md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6">
        {isLoading ? (
          <p className="font-semibold text-center text-xl">게시글을 불러오고 있습니다.</p>
        ) : (
          <BestPostContents bestPost={bestPost} />
        )}
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
      </div>
    </>
  );
};

export default BestPost;
