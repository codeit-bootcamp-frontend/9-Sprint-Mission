// src/pages/addArticle/index.tsx
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import InputItem from "@/components/UI/InputItem";
import ImageUpload from "@/components/UI/ImageUpload";
import AlertModal from "@/components/UI/modal/AlertModal";
import { ArticleForm } from "@/types/article";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { useArticle } from "@/hooks/useArticle";

const AddArticlePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [user] = useAtom(userAtom);
  const router = useRouter();

  const { addArticle, isLoading } = useArticle();

  const isSubmitDisabled = !title || !content || isLoading.add;

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
      image: imageUrl,
    };

    try {
      const { article } = await addArticle(articleForm);
      if (article) {
        router.push(`/community/${article.id}`);
      }
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      setAlertMessage("게시글 등록 중 오류가 발생했습니다.");
      setIsAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

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
            {isLoading.add ? "등록 중..." : "등록"}
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

          <ImageUpload title="이미지" onImageUpload={handleImageUpload} />
        </div>
      </form>

      <AlertModal isOpen={isAlertOpen} message={alertMessage} onClose={handleCloseAlert} />
    </div>
  );
};

export default AddArticlePage;
