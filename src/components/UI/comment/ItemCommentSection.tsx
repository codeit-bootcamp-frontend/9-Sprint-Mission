// src/components/UI/comment/ItemCommentSection.tsx
import React, { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/router"; // Next.js 라우터 사용
import { addProductComment } from "@/api/product"; // 상품 댓글 등록 API 함수 임포트
import CommentThread from "./ItemCommentThread"; // 댓글 쓰레드 컴포넌트
import AlertModal from "../modal/AlertModal"; // AlertModal 임포트
import { getCookie } from "@/utils/cookie";

const COMMENT_PLACEHOLDER =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

interface ItemCommentSectionProps {
  productId: number;
}

const ItemCommentSection = ({ productId }: ItemCommentSectionProps) => {
  const [comment, setComment] = useState(""); // 댓글 입력 상태
  const [loading, setLoading] = useState(false); // 버튼 로딩 상태 처리
  const [token, setToken] = useState<string | null>(null); // 쿠키에서 가져온 토큰 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false); // AlertModal 상태
  const [alertMessage, setAlertMessage] = useState(""); // AlertModal 메시지 상태
  const router = useRouter(); // Next.js 라우터 사용하여 페이지 이동 처리

  // 컴포넌트 마운트 시 쿠키에서 accessToken 가져오기
  useEffect(() => {
    const accessToken = getCookie("accessToken"); // 쿠키에서 accessToken 가져옴
    setToken(accessToken || null); // 토큰이 있으면 상태에 저장
  }, []);

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

    if (!token) {
      // 토큰이 없을 경우 AlertModal 띄우기
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    try {
      setLoading(true); // 로딩 상태 설정
      // API를 호출하여 댓글 등록
      await addProductComment(productId, comment.trim(), token);
      // 댓글 등록 성공 시 페이지 리로드
      router.reload(); // 페이지 강제 리로드
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
          disabled={!comment.trim() || loading} // 댓글이 없거나 로딩 중일 때 버튼 비활성화
        >
          {loading ? "등록 중..." : "등록"}
        </button>
      </section>

      {/* 댓글 쓰레드 컴포넌트 */}
      <CommentThread productId={productId} />

      {/* AlertModal 컴포넌트 */}
      {isAlertOpen && (
        <AlertModal message={alertMessage} onClose={handleCloseAlert} />
      )}
    </>
  );
};

export default ItemCommentSection;
