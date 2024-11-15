"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { PostList } from "../../types/post";
import { useParams } from "next/navigation";
import { getPostItem } from "../actions/post";
import { toast } from "react-hot-toast";
import { HiArrowPath } from "react-icons/hi2";
import FavoriteCount from "@/components/ui/FavoriteCount";

const Post = () => {
  const { postId } = useParams();
  const id = Number(postId);
  const [isPending, setIsPending] = useState(false);
  const [post, setPost] = useState<PostList>();

  const getPost = useCallback(async () => {
    try {
      setIsPending(true);
      const response = await getPostItem(id);

      if (response) {
        setPost(response);
      }
    } catch (error) {
      console.error("게시글 조회 실패", error);
      toast.error("게시글 조회 실패");
    } finally {
      setIsPending(false);
    }
  }, [id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (isPending) {
    return (
      <div className="text-center font-bold text-xl flex items-center justify-center space-x-2">
        <HiArrowPath className="animate-spin" />
        게시글 조회 중입니다.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{post?.title}</h2>
          <button>
            <Image src="/icons/itemMenu.png" alt="메뉴" width={24} height={24} />
          </button>
        </div>
        <div className="flex items-center space-x-4 pb-4 border-b border-panda-gray200">
          <div className="flex items-center space-x-4">
            <Image src="/icons/sessionBtn.png" alt="유저프로필" width={40} height={40} />
            <div className="flex items-center space-x-1 text-sm">
              <h3 className="font-medium text-panda-gray600">{post?.writer.nickname}</h3>
              <span className="text-panda-gray400">{post?.createdAt.split("T")[0]}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-[1px] bg-panda-gray200 h-8" />
            <FavoriteCount productId={id} favoriteCount={post?.likeCount || 0} />
          </div>
        </div>
        <p>{post?.content}</p>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold">댓글달기</h2>
          댓글폼
        </div>
      </div>
      <div className="flex flex-col space-y-10">댓글목록</div>
    </>
  );
};

export default Post;
