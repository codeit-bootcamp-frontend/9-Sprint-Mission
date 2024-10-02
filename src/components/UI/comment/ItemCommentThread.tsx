// src/components/UI/comment/ItemCommentThread.tsx
import { useEffect, useState, useRef, useCallback } from "react";
import { getProductComments } from "@/api/item";
import EmptyStateImage from "@/images/ui/empty-comments.svg";
import KebabIcon from "@/images/icons/ic_kebab.svg";
import DefaultProfileImage from "@/images/ui/ic_profile-40.png";
import { formatUpdatedAt } from "@/utils/dateUtils";
import { Comment, CommentListResponse } from "@/types/comment";
import Image from "next/image";
import { isValidImageUrl } from "@/utils/imageUtils"; // 이미지 유효성 검사 함수 가져오기

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
      : DefaultProfileImage.src;

  return (
    <>
      <div className="py-6 relative">
        {/* 케밥 버튼 (추후 기능 추가 예정) */}
        <button className="absolute right-0">
          <KebabIcon className="w-6 h-6" />
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
    <EmptyStateImage className="w-24 h-24" />
    <p className="text-gray-400 text-base leading-6">아직 문의가 없습니다.</p>
  </div>
);

// 댓글 스레드를 나타내는 컴포넌트 (상품 ID를 받아 댓글을 표시)
interface CommentThreadProps {
  productId: number;
}

const CommentThread = ({ productId }: CommentThreadProps) => {
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 리스트
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [nextCursor, setNextCursor] = useState<number | null>(null); // 무한 스크롤을 위한 다음 커서
  const [hasMore, setHasMore] = useState(true); // 더 많은 댓글이 있는지 여부

  const observer = useRef<IntersectionObserver | null>(null); // IntersectionObserver 참조
  const lastCommentRef = useRef<HTMLDivElement | null>(null); // 마지막 댓글에 대한 참조

  // 댓글을 가져오는 함수 (useCallback으로 메모이제이션)
  const fetchComments = useCallback(async () => {
    if (!productId || !hasMore) return; // 상품 ID가 없거나 더 이상 댓글이 없으면 종료

    setIsLoading(true);
    const limit = 10; // 한 번에 불러올 댓글 수
    const cursor = nextCursor; // 다음 페이지를 위한 커서

    try {
      // API 호출하여 댓글 목록 가져오기
      const response: CommentListResponse = await getProductComments({
        productId,
        limit,
        cursor,
      });

      // 이전 댓글에 새로 불러온 댓글 추가
      setComments((prev) => [...prev, ...response.list]);
      // 다음 커서 업데이트 (더 이상 없으면 null)
      setNextCursor(response.nextCursor || null);
      // 더 가져올 댓글이 있는지 여부
      setHasMore(!!response.nextCursor);
      setError(null); // 에러 초기화
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("상품의 댓글을 불러오지 못했어요."); // 에러 메시지 설정
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  }, [productId, hasMore, nextCursor]);

  // 무한 스크롤: 마지막 댓글이 화면에 보이면 추가 댓글 로딩
  useEffect(() => {
    if (isLoading) return;

    // 마지막 댓글이 화면에 들어오면 추가 댓글을 로딩하는 콜백
    const loadMoreComments = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        fetchComments(); // 댓글 추가 로딩
      }
    };

    if (observer.current) observer.current.disconnect(); // 기존 observer 해제

    observer.current = new IntersectionObserver(loadMoreComments); // 새로운 observer 설정
    if (lastCommentRef.current)
      observer.current.observe(lastCommentRef.current); // 마지막 댓글 관찰 시작
  }, [isLoading, hasMore, fetchComments]);

  // 첫 댓글 로드 및 상품 ID 변경 시 댓글 리셋
  useEffect(() => {
    setComments([]); // 댓글 리스트 초기화
    fetchComments(); // 댓글 불러오기
  }, [productId, fetchComments]);

  // 로딩 상태 처리
  if (isLoading && !comments.length) {
    return <div className="text-center py-4">상품 댓글 로딩중...</div>;
  }

  // 에러 처리
  if (error) {
    return <div className="text-red-500 text-center py-4">오류: {error}</div>;
  }

  // 댓글이 없는 경우 EmptyState 표시
  if (comments.length === 0) {
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
      {isLoading && <div className="text-center py-4">댓글 불러오는 중...</div>}{" "}
      {/* 추가 댓글 로딩 중 상태 */}
    </div>
  );
};

export default CommentThread;
