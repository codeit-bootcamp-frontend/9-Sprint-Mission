"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PostList } from "../../types/post";
import { useParams } from "next/navigation";
import { getPostItem } from "../actions/post";
import { toast } from "react-hot-toast";
import { HiArrowPath } from "react-icons/hi2";
import FavoriteCount from "@/components/ui/FavoriteCount";
import CommentForm from "@/components/comments/CommentForm";
import Comments from "@/components/comments/Comments";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentType } from "@/app/items/types/Items";
import { FetchComment } from "@/components/FetchComment";
import { useObserver } from "@/hooks/useObserver";
import ItemMenu from "@/components/ui/ItemMenu";

const Post = () => {
  const { postId } = useParams();
  const id = Number(postId);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [post, setPost] = useState<PostList>();
  const { data: commentsData, fetchNextPage } = useInfiniteQuery<CommentType, Error>({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 0 }) => FetchComment(id, Number(pageParam), "board"),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!id,
  });

  const fetchMoreComments = () => {
    if (commentsData?.pages[commentsData.pages.length - 1].nextCursor) {
      fetchNextPage();
    }
  };
  const setTarget = useObserver(fetchMoreComments);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpenMenuId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }, [id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (isPending) {
    return (
      <div className="text-center font-bold text-xl flex items-center justify-center space-x-2 mt-20">
        <HiArrowPath className="animate-spin" />
        게시글 조회 중입니다.
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-center font-bold text-xl mt-20">게시글 조회 중 오류가 발생했습니다.</p>
    );

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{post?.title}</h2>
          <div ref={containerRef} className="relative">
            <button onClick={() => setOpenMenuId(openMenuId === id ? null : id)}>
              <Image src="/icons/itemMenu.png" alt="메뉴" width={24} height={24} />
            </button>
            {openMenuId === id && (
              <ItemMenu menu1="수정하기" menu2="삭제하기" id={id} location="board" />
            )}
          </div>
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
            <FavoriteCount id={id} favoriteCount={post?.likeCount || 0} location="board" />
          </div>
        </div>
        <p>{post?.content}</p>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <CommentForm id={id} title="댓글달기" location="board" />
        </div>
      </div>
      <div className="flex flex-col space-y-10">
        {commentsData?.pages && commentsData?.pages.some((page) => page.list.length > 0) ? (
          <>
            <Comments commentsData={commentsData.pages.flatMap((page) => page.list)} />
            <div ref={setTarget} className="h-1" />
          </>
        ) : (
          <div className="flex flex-col space-y-4 w-[151px] m-auto">
            <Image src="/images/Img_reply_empty.png" alt="댓글 없음" width={140} height={140} />
            <span className="break-keep text-center text-panda-gray400">
              아직 댓글이 없어요, 지금 댓글을 달아보세요!
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
