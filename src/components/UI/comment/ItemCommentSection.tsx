// src/components/UI/comment/ItemCommentSection.tsx
import React, { ChangeEvent, useState } from "react";
import { addProductComment } from "@/api/comments/addProductComment"; // 상품 댓글 등록 API 함수 임포트
import CommentThread from "./ItemCommentThread"; // 댓글 쓰레드 컴포넌트
import AlertModal from "../modal/AlertModal"; // AlertModal 임포트
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";

const COMMENT_PLACEHOLDER =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

interface ItemCommentSectionProps {
  productId: number;
}

const ItemCommentSection = ({ productId }: ItemCommentSectionProps) => {
  const [comment, setComment] = useState(""); // 댓글 입력 상태
  const [loading, setLoading] = useState(false); // 버튼 로딩 상태 처리
  const [isAlertOpen, setIsAlertOpen] = useState(false); // AlertModal 상태
  const [alertMessage, setAlertMessage] = useState(""); // AlertModal 메시지 상태
  const [refreshComments, setRefreshComments] = useState(0); // CommentThread 리렌더링 트리거 상태
  const [user] = useAtom(userAtom);

  // 입력 필드 값 변경 시 상태 업데이트
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // 댓글 등록 버튼 클릭 시 호출
  const handlePostComment = async () => {
    if (!comment.trim()) {
      // 빈 댓글일 경우 AlertModal 띄우기
      setAlertMessage("댓글을 입력해주세요.");
      setIsAlertOpen(true);
      return;
    }

    if (!user) {
      // user가 없을 경우 AlertModal 띄우기
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    try {
      setLoading(true); // 로딩 상태 설정
      // API를 호출하여 댓글 등록
      await addProductComment({ productId, content: comment.trim() });
      // 댓글 등록 성공 시 입력 필드 초기화 및 CommentThread 리렌더링 트리거
      setComment(""); // 입력 필드 초기화
      setRefreshComments((prev) => prev + 1); // CommentThread 리렌더링 트리거
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      setAlertMessage("댓글 등록에 실패했습니다. 다시 시도해주세요.");
      setIsAlertOpen(true); // 실패 메시지 모달 띄우기
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // AlertModal 닫기
  const handleCloseAlert = () => {
    setIsAlertOpen(false); // 모달 닫기
  };

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
          disabled={!comment.trim() || loading} // 댓글, 로딩 상태에 따라 버튼 비활성화
        >
          {loading ? "등록 중..." : "등록"}
        </button>
      </section>

      {/* 댓글 쓰레드 컴포넌트 */}
      <CommentThread productId={productId} key={refreshComments} />

      {/* AlertModal 컴포넌트 */}
      {isAlertOpen && (
        <AlertModal message={alertMessage} onClose={handleCloseAlert} />
      )}
    </>
  );
};

export default ItemCommentSection;
