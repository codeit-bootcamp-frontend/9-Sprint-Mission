import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputItem from "@/components/UI/InputItem";
import ImageUpload from "@/components/UI/ImageUpload";
import AlertModal from "@/components/UI/modal/AlertModal";
import { ArticleSchema } from "@/zod/articleSchema";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { useArticle } from "@/hooks/useArticle";

const EditArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const articleId = Number(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [user] = useAtom(userAtom);

  const { useArticleDetail, updateArticle, isLoading } = useArticle();
  const { data: articleDetail } = useArticleDetail(articleId);

  // 권한 체크
  useEffect(() => {
    if (articleDetail && user && articleDetail.writer.id !== user.id) {
      setAlertMessage("수정 권한이 없습니다.");
      setIsAlertOpen(true);
      router.push(`/community/${articleId}`);
    }
  }, [articleDetail, user, articleId, router]);

  // 게시글 정보가 로드되면 폼 값 설정
  useEffect(() => {
    if (articleDetail) {
      setTitle(articleDetail.title);
      setContent(articleDetail.content);
      setImageUrl(articleDetail.image || null);
    }
  }, [articleDetail]);

  const isSubmitDisabled = !title || !content || isLoading.update;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    const articleForm: ArticleSchema = {
      title,
      content,
      image: imageUrl || null,
    };

    try {
      await updateArticle({ articleId, articleForm });
      router.push(`/community/${articleId}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      setAlertMessage("게시글 수정 중 오류가 발생했습니다.");
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

  if (!articleId || !articleDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="container mx-auto mt-20 px-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">게시글 수정하기</div>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading.update ? "수정 중..." : "수정"}
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

          <ImageUpload title="게시글 이미지" onImageUpload={handleImageUpload} />
        </div>
      </form>

      <AlertModal isOpen={isAlertOpen} message={alertMessage} onClose={handleCloseAlert} />
    </div>
  );
};

export default EditArticlePage;
