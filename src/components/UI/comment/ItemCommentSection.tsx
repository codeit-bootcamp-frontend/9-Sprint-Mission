import React, { ChangeEvent, useState } from "react";
import CommentThread from "./ItemCommentThread";

const COMMENT_PLACEHOLDER =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

interface ItemCommentSectionProps {
  productId: number;
}

const ItemCommentSection = ({ productId }: ItemCommentSectionProps) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {};

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="text-base font-semibold">문의하기</div>

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

      <CommentThread productId={productId} />
    </>
  );
};

export default ItemCommentSection;
