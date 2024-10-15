// src/components/UI/comment/ArticleCommentThread.tsx
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { getArticleComments } from "@/api/comments/getArticleComments";
import { formatUpdatedAt } from "@/utils/dateUtils";
import { Comment, CommentListResponse } from "@/types/comment";
import EmptyComment from "../EmptyComment";
import { isValidImageUrl } from "@/utils/imageUtils"; // 이미지 유효성 검사 함수 가져오기

// public 폴더 경로 문자열로 대체
const KEBAB_ICON = "/images/icons/ic_kebab.png";
const DEFAULT_PROFILE_IMAGE = "/images/ui/ic_profile-40.png";

// 댓글 하나를 나타내는 컴포넌트
interface CommentItemProps {
  item: Comment;
}

const CommentItem = ({ item }: CommentItemProps) => {
  const authorInfo = item.writer;
  const formattedTimestamp = formatUpdatedAt(item.updatedAt); // 시간 포맷팅

  // 작성자의 프로필 이미지가 유효한지 확인 후 이미지 URL 설정
  const imageUrl =
    authorInfo.image && isValidImageUrl(authorInfo.image)
      ? `/api/imageProxy?url=${encodeURIComponent(authorInfo.image)}`
      : DEFAULT_PROFILE_IMAGE;

  return (
    <>
      <div className="py-6 relative">
        {/* 케밥 버튼 (추후 기능 추가 예정) */}
        <button className="absolute right-0">
          <Image
            src={KEBAB_ICON}
            width={24}
            height={24}
            alt="케밥 이미지 버튼"
            className="w-6 h-6"
          />
        </button>

        <p className="text-base leading-[140%] mb-6">{item.content}</p>

        {/* 작성자 정보 및 프로필 이미지 */}
        <div className="flex items-center gap-2">
          <Image
            src={imageUrl}
            alt={`${authorInfo.nickname}님의 프로필 사진`}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-gray-600 text-sm mb-1">{authorInfo.nickname}</p>
            <p className="text-gray-400 text-xs">{formattedTimestamp}</p>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200 my-0" />
    </>
  );
};

// 댓글이 없을 때 표시되는 상태 컴포넌트
const EmptyState = () => (
  <div className="m-6 flex flex-col items-center gap-6">
    <EmptyComment text="아직 댓글이 없어요.<br />지금 댓글을 달아보세요!" />
  </div>
);

// 댓글 스레드를 나타내는 컴포넌트 (게시글 ID를 받아 댓글을 표시)
interface CommentThreadProps {
  articleId: number;
}

const CommentThread = ({ articleId }: CommentThreadProps) => {
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 리스트
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [nextCursor, setNextCursor] = useState<number | null>(null); // 다음 커서

  const observer = useRef<IntersectionObserver | null>(null); // IntersectionObserver 참조
  const lastCommentRef = useRef<HTMLDivElement | null>(null); // 마지막 댓글에 대한 참조

  const fetchComments = useCallback(
    async (cursor: number | null = null) => {
      if (!articleId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response: CommentListResponse = await getArticleComments(
          articleId,
          {
            limit: 10,
            cursor,
          }
        );

        if (cursor === null) {
          setComments(response.list);
        } else {
          setComments((prev) => [...prev, ...response.list]);
        }
        setNextCursor(response.nextCursor || null);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("게시글의 댓글을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    },
    [articleId]
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    if (isLoading) return;

    const loadMoreComments = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && nextCursor) {
        fetchComments(nextCursor);
      }
    };

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(loadMoreComments);
    if (lastCommentRef.current)
      observer.current.observe(lastCommentRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading, nextCursor, fetchComments]);

  // 로딩 상태 처리
  if (isLoading && comments.length === 0) {
    return <div className="text-center py-4">게시글 댓글 로딩중...</div>;
  }

  // 에러 처리
  if (error) {
    return <div className="text-red-500 text-center py-4">오류: {error}</div>;
  }

  // 댓글이 없는 경우 EmptyState 표시
  if (!isLoading && comments.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mb-10">
      {comments.map((item, index) => (
        <div
          key={`comment-${item.id}`}
          ref={index === comments.length - 1 ? lastCommentRef : null} // 마지막 댓글에 대한 ref 설정
        >
          <CommentItem item={item} />
        </div>
      ))}
      {isLoading && <div className="text-center py-4">댓글 불러오는 중...</div>}
    </div>
  );
};

export default CommentThread;
