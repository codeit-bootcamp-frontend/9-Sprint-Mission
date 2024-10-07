// src/pages/addArticle/index.tsx
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import InputItem from "@/components/UI/InputItem";
import ImageUpload from "@/components/UI/ImageUpload";
import ConfirmModal from "@/components/UI/modal/ConfirmModal";
import AlertModal from "@/components/UI/modal/AlertModal";
import { ArticleForm } from "@/types/article";
import { addArticle } from "@/api/article";
import { getCookie } from "@/utils/cookie";

export default function AddArticlePage() {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 URL 상태
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // 접근 시 로그인 유도 모달 상태
  const [isAlertModalOpen, setAlertModalOpen] = useState(false); // 제출 시 경고 모달 상태
  const [accessToken, setAccessToken] = useState<string | null>(null); // accessToken 상태

  const router = useRouter();

  // 쿠키에서 accessToken을 가져와 로그인 상태를 설정
  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      setAccessToken(token);
    } else {
      setConfirmModalOpen(true); // 토큰이 없으면 로그인 유도 모달 표시
    }
  }, []);

  // 제목과 내용이 없으면 제출 버튼을 비활성화
  const isSubmitDisabled = !title || !content;

  // 게시글 제출 핸들러
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      setAlertModalOpen(true); // 로그인하지 않은 경우 경고 모달을 띄움
      return;
    }

    const articleForm: ArticleForm = {
      title,
      content,
      image: imageUrl, // 이미지 URL이 있을 경우 포함
    };

    try {
      // API를 호출하여 게시글 등록
      const newArticle = await addArticle(articleForm, accessToken);

      // 등록 성공 시 해당 게시글 페이지로 이동
      router.push(`/community/${newArticle.id}`);
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록 중 오류가 발생했습니다."); // 사용자에게 에러 알림
    }
  };

  // 로그인 유도 모달에서 '확인'을 눌렀을 때 로그인 페이지로 이동
  const handleConfirmModalConfirm = () => {
    router.push("/auth/login");
  };

  // 로그인 유도 모달에서 '취소'를 눌렀을 때 모달 닫기
  const handleConfirmModalCancel = () => {
    setConfirmModalOpen(false);
  };

  // 경고 모달 닫기
  const handleAlertModalClose = () => {
    setAlertModalOpen(false);
  };

  // 이미지 업로드 후 이미지 URL 상태를 업데이트
  const handleImageUpload = (uploadedImageUrl: string | null) => {
    setImageUrl(uploadedImageUrl);
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      {/* 로그인하지 않은 경우 접근 시 모달 표시 */}
      {isConfirmModalOpen && (
        <ConfirmModal
          message="로그인한 사용자만 게시글 등록이 가능합니다.<br />로그인 페이지로 이동하겠습니까?"
          onConfirm={handleConfirmModalConfirm}
          onCancel={handleConfirmModalCancel}
        />
      )}

      {/* 제출 시 로그인하지 않은 경우 경고 모달 표시 */}
      {isAlertModalOpen && (
        <AlertModal
          message="로그인한 사용자만 게시글을 등록할 수 있습니다!"
          onClose={handleAlertModalClose}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">게시글 등록하기</div>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            등록
          </button>
        </div>

        <div className="space-y-6">
          <InputItem
            id="title"
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
          />

          <InputItem
            id="content"
            label="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요"
            isTextArea
          />

          {/* 이미지 업로드 컴포넌트, 이미지 URL을 전달 */}
          <ImageUpload title="이미지" onImageUpload={handleImageUpload} />
        </div>
      </form>
    </div>
  );
}
