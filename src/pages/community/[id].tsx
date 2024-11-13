// src/pages/community/[id].tsx
import React from "react";
import { useRouter } from "next/router";
import ArticleDetailSection from "@/components/UI/community/ArticleDetailSection";
import ArticleCommentSection from "@/components/UI/comment/ArticleCommentSection";
import BackToListButton from "@/components/UI/BackToListButton";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const articleId = Number(id);

  return (
    <>
      <div className="container mx-auto pt-24 px-4">
        <ArticleDetailSection articleId={articleId} />
        <hr className="my-6 border-t border-gray-200" />
        <ArticleCommentSection articleId={articleId} />
      </div>
      <BackToListButton path="/community" />
    </>
  );
};

export default ArticlePage;
