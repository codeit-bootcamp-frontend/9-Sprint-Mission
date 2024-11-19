// src/components/UI/comment/ArticleCommentThread.tsx
import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { formatUpdatedAt } from "@/utils/dateUtils";
import { Comment } from "@/types/comment";
import EmptyComment from "../EmptyComment";
import { isValidImageUrl } from "@/utils/imageUtils";
import { useComment } from "@/hooks/useComment";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import ConfirmModal from "../modal/ConfirmModal";
import AlertModal from "../modal/AlertModal";

const KEBAB_ICON = "/images/icons/ic_kebab.png";
const DEFAULT_PROFILE_IMAGE = "/images/ui/ic_profile-40.png";

interface CommentItemProps {
  item: Comment;
  onCommentUpdate: (commentId: number, content: string) => Promise<void>;
  onCommentDelete: (commentId: number) => Promise<void>;
}

const CommentItem = ({ item, onCommentUpdate, onCommentDelete }: CommentItemProps) => {
  const [user] = useAtom(userAtom);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(item.content);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const authorInfo = item.writer;
  const formattedTimestamp = formatUpdatedAt(item.updatedAt);
  const isOwner = user?.id === authorInfo.id;

  const imageUrl =
    authorInfo.image && isValidImageUrl(authorInfo.image)
      ? `/api/imageProxy?url=${encodeURIComponent(authorInfo.image)}`
      : DEFAULT_PROFILE_IMAGE;

  // 드롭다운 외부 클릭 처리
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isDropdownOpen && !target.closest(".kebab-menu")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleEdit = () => {
    setIsEditing(true);
    setIsDropdownOpen(false);
  };

  const handleDelete = () => {
    setIsDropdownOpen(false);
    setIsConfirmOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      await onCommentUpdate(item.id, editContent);
      setIsEditing(false);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      setAlertMessage("댓글 수정에 실패했습니다.");
      setIsAlertOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await onCommentDelete(item.id);
      setIsConfirmOpen(false);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      setAlertMessage("댓글 삭제에 실패했습니다.");
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <div className="py-6 relative">
        {isOwner && (
          <div className="absolute right-0 kebab-menu">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Image src={KEBAB_ICON} width={24} height={24} alt="메뉴" className="w-6 h-6" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg p-2 text-sm text-gray-700 z-10">
                <button onClick={handleEdit} className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">
                  수정하기
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-red-500"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}

        {isEditing ? (
          <div className="mb-4">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                수정완료
              </button>
            </div>
          </div>
        ) : (
          <p className="text-base leading-[140%] mb-6">{item.content}</p>
        )}

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

      <ConfirmModal
        isOpen={isConfirmOpen}
        message="댓글을 삭제하시겠습니까?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
      <AlertModal isOpen={isAlertOpen} message={alertMessage} onClose={() => setIsAlertOpen(false)} />
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
  const { useInfiniteComments, updateComment, removeComment } = useComment();
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

  const handleCommentUpdate = async (commentId: number, content: string) => {
    await updateComment({ commentId, content });
  };

  const handleCommentDelete = async (commentId: number) => {
    await removeComment(commentId);
  };

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
          <CommentItem item={item} onCommentUpdate={handleCommentUpdate} onCommentDelete={handleCommentDelete} />
        </div>
      ))}
      {isFetchingNextPage && <div className="text-center py-4">댓글 불러오는 중...</div>}
    </div>
  );
};

export default CommentThread;
