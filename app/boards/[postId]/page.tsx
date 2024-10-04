"use client";

import BackToListBtn from "@/components/BackToListBtn";
import PostCommentForm from "@/components/boards/PostCommentForm";
import CommentsMap from "@/components/CommentsMap";
import { instance } from "@/lib/axios";
import { IComment } from "@/types/boardsTypeShare";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IWriter {
  nickname: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  writer: IWriter;
  isLiked: boolean;
}

const BoardPost = () => {
  const { postId } = useParams();
  const id = Number(postId);
  
  const [post, setPost] = useState<IPost>();
  const [postComments, setPostComments] = useState<IComment[]>([]);

  const getPost = useCallback(async () => {
    try {
      const response = await instance.get(`/articles/${postId}`);

      if (response.status === 200) {
        setPost(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("자유게시판 getPost에서 api 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    }
  }, [postId]);

  const getPostComments = useCallback(async () => {
    try {
      const response = await instance.get(`/articles/${postId}/comments?limit=10`);

      if (response.status === 200) {
        setPostComments(response.data.list);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("자유게시판 getPostComments에서 api 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    }
  }, [postId]);

  useEffect(() => {
    getPost();
    getPostComments();
  }, [getPost, getPostComments]);

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{post?.title}</h2>
          <button>
            <Image src="/icons/itemMenu.png" alt="메뉴" width={24} height={24} />
          </button>
        </div>
        <div className="flex items-center space-x-4 pb-4 border-b border-[--color-gray200]">
          <div className="flex items-center space-x-4">
            <Image src="/icons/sessionBtn.png" alt="유저프로필" width={40} height={40} />
            <div className="flex items-center space-x-1 text-sm">
              <h3 className="font-medium text-[#4B5563]">{post?.writer.nickname}</h3>
              <span className="text-[--color-gray400]">{post?.createdAt.split("T")[0]}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-[1px] bg-[--color-gray200] h-8" />
            <button className="flex items-center space-x-1 px-3 py-1 rounded-full border border-[--color-gray200]">
              <Image
                src="/icons/ic_heart.svg"
                alt="좋아요"
                width={24}
                height={24}
                className="md:w-8 md:h-8"
              />
              <span className="font-medium text-[--color-gray500]">{post?.likeCount}</span>
            </button>
          </div>
        </div>
        <p>{post?.content}</p>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold">댓글달기</h2>
          <PostCommentForm postId={id} setPostComments={setPostComments} />
        </div>
      </div>
      {postComments.length > 0 ? (
        <div className="flex flex-col space-y-10">
          <CommentsMap comments={postComments} />
        </div>
      ) : (
        <div className="flex flex-col space-y-4 w-[151px] m-auto">
          <Image src="/images/Img_reply_empty.png" alt="댓글 없음" width={140} height={140} />
          <span className="break-keep text-center text-[--color-gray400]">
            아직 댓글이 없어요, 지금 댓글을 달아보세요!
          </span>
        </div>
      )}
      <BackToListBtn />
    </div>
  );
};

export default BoardPost;
