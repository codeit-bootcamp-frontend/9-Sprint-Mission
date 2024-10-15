// src/pages/addArticle/index.tsx
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import InputItem from "@/components/UI/InputItem";
import ImageUpload from "@/components/UI/ImageUpload";
import AlertModal from "@/components/UI/modal/AlertModal";
import { ArticleForm } from "@/types/article";
import { addArticle } from "@/api/articles/addArticle";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";

export default function AddArticlePage() {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 URL 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false); // AlertModal 상태
  const [alertMessage, setAlertMessage] = useState(""); // AlertModal 메시지 상태
  const [user] = useAtom(userAtom);

  const router = useRouter();

  // 제목과 내용이 없으면 제출 버튼을 비활성화
  const isSubmitDisabled = !title || !content;

  // 게시글 제출 핸들러
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    const articleForm: ArticleForm = {
      title,
      content,
      image: imageUrl, // 이미지 URL이 있을 경우 포함
    };

    try {
      // API를 호출하여 게시글 등록
      const newArticle = await addArticle(articleForm);

      if (newArticle) {
        // 등록 성공 시 해당 게시글 페이지로 이동
        router.push(`/community/${newArticle.id}`);
      }
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록 중 오류가 발생했습니다."); // 사용자에게 에러 알림
    }
  };

  // 경고 모달 닫기
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  // 이미지 업로드 후 이미지 URL 상태를 업데이트
  const handleImageUpload = (uploadedImageUrl: string | null) => {
    if (uploadedImageUrl) {
      setImageUrl(uploadedImageUrl);
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
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

      {/* AlertModal 컴포넌트 */}
      <AlertModal
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </div>
  );
}
