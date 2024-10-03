// src/components/UI/comment/ArticleCommentThread.tsx
import { useEffect, useState, useRef } from "react";
import { getArticleComments } from "@/api/article";
import KebabIcon from "/images/icons/ic_kebab.svg";
import DefaultProfileImage from "/images/ui/ic_profile-40.png";
import { formatUpdatedAt } from "@/utils/dateUtils";
import { Comment, CommentListResponse } from "@/types/comment";
import Image from "next/image";
import EmptyComment from "../EmptyComment";
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
  const [hasMore, setHasMore] = useState(true); // 더 많은 댓글이 있는지 여부

  const observer = useRef<IntersectionObserver | null>(null); // IntersectionObserver 참조
  const lastCommentRef = useRef<HTMLDivElement | null>(null); // 마지막 댓글에 대한 참조

  // 첫 댓글 로드 및 게시글 ID 변경 시 댓글 리셋
  useEffect(() => {
    setComments([]); // 댓글 리스트 초기화
    setNextCursor(null); // 커서 초기화
    setHasMore(true); // hasMore 초기화
    setError(null); // 에러 초기화
    setIsLoading(true); // 로딩 상태 설정

    // 비동기 함수 선언
    const fetchComments = async () => {
      if (!articleId) return; // 게시글 ID가 없으면 종료

      const limit = 10; // 한 번에 불러올 댓글 수
      const cursor = null; // 초기 커서는 null

      try {
        // API 호출하여 댓글 목록 가져오기
        const response: CommentListResponse = await getArticleComments({
          articleId,
          limit,
          cursor,
        });

        setComments(response.list);
        setNextCursor(response.nextCursor || null);
        setHasMore(!!response.nextCursor);
        setError(null);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("게시글의 댓글을 불러오지 못했어요.");
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    fetchComments(); // 비동기 함수 호출
  }, [articleId]); // articleId가 변경될 때만 실행

  // 무한 스크롤: 마지막 댓글이 화면에 보이면 추가 댓글 로딩
  useEffect(() => {
    if (isLoading) return;

    // 추가 댓글을 로딩하는 함수
    const fetchMoreComments = async () => {
      if (!hasMore) return;

      setIsLoading(true);
      const limit = 10;
      const cursor = nextCursor;

      try {
        const response: CommentListResponse = await getArticleComments({
          articleId,
          limit,
          cursor,
        });

        setComments((prev) => [...prev, ...response.list]);
        setNextCursor(response.nextCursor || null);
        setHasMore(!!response.nextCursor);
        setError(null);
      } catch (error) {
        console.error("Error fetching more comments:", error);
        setError("게시글의 댓글을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    // IntersectionObserver 콜백 함수
    const loadMoreComments = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        fetchMoreComments(); // 추가 댓글 로딩
      }
    };

    if (observer.current) observer.current.disconnect(); // 기존 observer 해제

    observer.current = new IntersectionObserver(loadMoreComments); // 새로운 observer 설정
    if (lastCommentRef.current)
      observer.current.observe(lastCommentRef.current); // 마지막 댓글 관찰 시작

    // 클린업 함수로 observer 해제
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading, hasMore, nextCursor, articleId]); // 필요한 의존성 포함

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
