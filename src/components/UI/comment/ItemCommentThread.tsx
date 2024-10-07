// src/components/UI/comment/ItemCommentThread.tsx
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { getProductComments } from "@/api/product";
import { formatUpdatedAt } from "@/utils/dateUtils";
import { Comment, CommentListResponse } from "@/types/comment";
import EmptyInquiry from "../EmptyInquiry";
import { isValidImageUrl } from "@/utils/imageUtils";

const KEBAB_ICON = "/images/icons/ic_kebab.png";
const DEFAULT_PROFILE_IMAGE = "/images/ui/ic_profile-40.png";

interface CommentItemProps {
  item: Comment;
}

const CommentItem = ({ item }: CommentItemProps) => {
  const authorInfo = item.writer;
  const formattedTimestamp = formatUpdatedAt(item.updatedAt);

  const imageUrl =
    authorInfo.image && isValidImageUrl(authorInfo.image)
      ? `/api/imageProxy?url=${encodeURIComponent(authorInfo.image)}`
      : DEFAULT_PROFILE_IMAGE;

  return (
    <>
      <div className="py-6 relative">
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

const EmptyState = () => (
  <div className="m-6 flex flex-col items-center gap-6">
    <EmptyInquiry text="아직 문의가 없습니다." />
  </div>
);

interface CommentThreadProps {
  productId: number;
}

const CommentThread = ({ productId }: CommentThreadProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<number | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);

  const fetchComments = useCallback(
    async (cursor: number | null = null) => {
      if (!productId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response: CommentListResponse = await getProductComments(
          productId,
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
        setError("상품의 댓글을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    },
    [productId]
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

  if (isLoading && comments.length === 0) {
    return <div className="text-center py-4">상품 댓글 로딩중...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">오류: {error}</div>;
  }

  if (!isLoading && comments.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mb-10">
      {comments.map((item, index) => (
        <div
          key={`comment-${item.id}`}
          ref={index === comments.length - 1 ? lastCommentRef : null}
        >
          <CommentItem item={item} />
        </div>
      ))}
      {isLoading && <div className="text-center py-4">댓글 불러오는 중...</div>}
    </div>
  );
};

export default CommentThread;
