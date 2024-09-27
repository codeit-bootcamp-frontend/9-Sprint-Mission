import Image from "next/image";
import Link from "next/link";
import SearchForm from "./SearchForm";
import { useCallback, useEffect, useState } from "react";
import { instance } from "@/lib/axios";
import { ISearchList } from "@/app/boards/boardsTypeShare";
import axios from "axios";
import { CalculateWidth } from "@/context/calculateWidth";
import toast from "react-hot-toast";

const BestPost = () => {
  const pageSize: number = CalculateWidth("best");

  const [bestPost, setBestPost] = useState<ISearchList[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getBestPosts = useCallback(async () => {
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
      } else {
        console.error("자유게시판 베스트게시글 getBestPosts에서 알 수 없는 오류 발생", error);
        toast.error("오류가 발생하여 베스트게시글을 불러오지 못했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    getBestPosts();
  }, [getBestPosts]);

  return (
    <div className="p-6 my-24 flex flex-col space-y-6 justify-center lg:w-[1200px] lg:m-auto lg:my-24 lg:p-0">
      <h2 className="text-lg font-bold">베스트 게시글</h2>
      <div className="md:grid md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6">
        {isLoading ? (
          <p className="font-semibold text-center text-xl">게시글을 불러오고 있습니다.</p>
        ) : (
          bestPost.map((post) => (
            <div
              key={post.id}
              className="flex flex-col space-y-4 bg-[--color-gray50] px-6 pb-4 rounded-lg"
            >
              <div className="bg-[--color-theme] flex items-center justify-center space-x-1 w-[102px] rounded-bl-2xl rounded-br-2xl px-6 py-[2px]">
                <Image src="/icons/ic_medal.svg" alt="메달" width={16} height={16} />
                <span className="text-white font-semibold">Best</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg leading-7 w-44">{post.content}</p>
                <div className="bg-white w-[72px] h-[72px] flex items-center justify-center rounded-lg border-[0.75px] border-[--color-gray200]">
                  <Image
                    src={post.image || "/icons/question.png"}
                    alt="제품 사진"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-[#4B5563]">{post.writer.nickname}</p>
                  <div className="flex items-center space-x-1">
                    <Image src="/icons/ic_heart.svg" alt="좋아요" width={16} height={16} />
                    <span className="text-sm text-[#4B5563]">{post.likeCount}</span>
                  </div>
                </div>
                <p className="text-sm text-[--color-gray400]">{post.createdAt.split("T")[0]}</p>
              </div>
            </div>
          ))
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
    </div>
  );
};

export default BestPost;
