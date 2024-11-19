// src/components/UI/comment/ArticleCommentSection.tsx
import React, { ChangeEvent, useState } from "react";
import CommentThread from "./ArticleCommentThread";
import AlertModal from "@/components/UI/modal/AlertModal";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { useComment } from "@/hooks/useComment";

const COMMENT_PLACEHOLDER = "댓글을 입력해주세요.";

interface ArticleCommentSectionProps {
  articleId: number;
}

const ArticleCommentSection = ({ articleId }: ArticleCommentSectionProps) => {
  const [comment, setComment] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [user] = useAtom(userAtom);

  const { addArticleComment, isLoading } = useComment();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = async () => {
    if (!comment.trim()) {
      setAlertMessage("댓글을 입력해주세요.");
      setIsAlertOpen(true);
      return;
    }

    if (!user) {
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    try {
      await addArticleComment({ articleId, content: comment.trim() });
      setComment("");
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      setAlertMessage("댓글 등록에 실패했습니다. 다시 시도해주세요.");
      setIsAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="text-base font-semibold">댓글달기</div>

        <textarea
          className="bg-gray-100 border-none rounded-xl p-4 h-26 resize-none placeholder-gray-400 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={COMMENT_PLACEHOLDER}
          value={comment}
          onChange={handleInputChange}
        />

        <button
          className="self-end font-semibold text-sm md:text-base px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
          onClick={handlePostComment}
          disabled={!comment.trim() || isLoading.addArticle}
        >
          {isLoading.addArticle ? "등록 중..." : "등록"}
        </button>
      </section>

      <CommentThread articleId={articleId} />
      <AlertModal isOpen={isAlertOpen} message={alertMessage} onClose={handleCloseAlert} />
    </>
  );
};

export default ArticleCommentSection;
