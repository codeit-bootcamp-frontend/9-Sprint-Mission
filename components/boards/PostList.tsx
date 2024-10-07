"use client";

import { useCallback, useEffect, useState } from "react";
import { ISearchList } from "@/types/boardsTypeShare";
import { instance } from "@/lib/axios";
import axios from "axios";
import Pagination from "../Pagination";
import toast from "react-hot-toast";
import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import AllPostMap from "./AllPostMap";

interface IProps {
  searchList: ISearchList[];
  searchLoading: boolean;
  orderBy: string;
}

// 전체 게시글 가져오는 컴포넌트
const PostList = ({ searchList, orderBy }: IProps) => {
  const pageSize: number = useCalculateWidth("all");

  const [posts, setPosts] = useState<ISearchList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  
  const isMobile = pageSize === 4;

  const getPosts = useCallback(async () => {
    if (pageSize === 0 || pageSize === Infinity) return null;

    try {
      const response = await instance.get(
        `/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`
      );

      if (response.status === 200) {
        setPosts(response.data.list);
        setTotalPage(Math.ceil(response.data.totalCount / pageSize));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("boards getPosts 함수에서 api 오류 발생", error);
        toast.error(error.response?.data);
      } 
    }
  }, [page, orderBy, pageSize]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="flex flex-col space-y-6">
      <AllPostMap allPost={posts} searchList={searchList} />
      {searchList.length === 0 && (
        <Pagination totalPage={totalPage} page={page} setPage={setPage} isMobile={isMobile} />
      )}
    </div>
  );
};

export default PostList;
