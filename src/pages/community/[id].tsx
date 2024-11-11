// src/pages/community/[id].tsx
import React from "react";
import { useRouter } from "next/router";
import ArticleDetailSection from "@/components/UI/community/ArticleDetailSection";
import ArticleCommentSection from "@/components/UI/comment/ArticleCommentSection";
import BackToListButton from "@/components/UI/BackToListButton";
import { useArticle } from "@/hooks/useArticle";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const articleId = Number(id);

  // useArticle 훅 사용
  const { useArticleDetail } = useArticle();
  const { data: articleDetail, isPending: isLoading, error } = useArticleDetail(articleId);

  if (error) {
    return (
      <>
        <div className="container mx-auto pt-24 px-4">
          오류가 발생했습니다: {error instanceof Error ? error.message : "알 수 없는 오류"}
        </div>
        <BackToListButton path="/community" />
      </>
    );
  }

  if (isLoading || !articleDetail) {
    return (
      <>
        <div className="container mx-auto pt-24 px-4">게시글을 불러오는 중...</div>
        <BackToListButton path="/community" />
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto pt-24 px-4">
        <ArticleDetailSection articleDetail={articleDetail} />
        <hr className="my-6 border-t border-gray-200" />
        <ArticleCommentSection articleId={articleDetail.id} />
      </div>
      <BackToListButton path="/community" />
    </>
  );
};

export default ArticlePage;
