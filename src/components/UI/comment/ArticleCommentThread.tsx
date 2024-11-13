// src/components/UI/comment/ArticleCommentThread.tsx
import { useRef, useCallback } from "react";
import Image from "next/image";
import { formatUpdatedAt } from "@/utils/dateUtils";
import { Comment } from "@/types/comment";
import EmptyComment from "../EmptyComment";
import { isValidImageUrl } from "@/utils/imageUtils";
import { useComment } from "@/hooks/useComment";

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
          <Image src={KEBAB_ICON} width={24} height={24} alt="케밥 이미지 버튼" className="w-6 h-6" />
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
    <EmptyComment text="아직 댓글이 없어요.<br />지금 댓글을 달아보세요!" />
  </div>
);

interface CommentThreadProps {
  articleId: number;
}

const CommentThread = ({ articleId }: CommentThreadProps) => {
  const { useInfiniteComments } = useComment();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteComments({
    articleId,
  });

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  // Intersection Observer 설정
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  if (isLoading && comments.length === 0) {
    return <div className="text-center py-4">게시글 댓글 로딩중...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">오류가 발생했습니다.</div>;
  }

  if (!isLoading && comments.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mb-10">
      {comments.map((item, index) => (
        <div key={`comment-${item.id}`} ref={index === comments.length - 1 ? lastCommentRef : null}>
          <CommentItem item={item} />
        </div>
      ))}
      {isFetchingNextPage && <div className="text-center py-4">댓글 불러오는 중...</div>}
    </div>
  );
};

export default CommentThread;
