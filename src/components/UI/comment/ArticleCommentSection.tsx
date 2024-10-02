import React, { ChangeEvent, useState } from "react";
import CommentThread from "./ArticleCommentThread";

const COMMENT_PLACEHOLDER = "댓글을 입력해주세요.";

interface ArticleCommentSectionProps {
  articleId: number;
}

const ArticleCommentSection = ({ articleId }: ArticleCommentSectionProps) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {};

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
          disabled={!comment.trim()}
        >
          등록
        </button>
      </section>

      <CommentThread articleId={articleId} />
    </>
  );
};

export default ArticleCommentSection;
