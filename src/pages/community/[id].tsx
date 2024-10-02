// src/pages/community/[id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getArticleDetail } from "@/api/article";
import { Article } from "@/types/article";
import ArticleDetailSection from "@/components/UI/community/ArticleDetailSection";
import ArticleCommentSection from "@/components/UI/comment/ArticleCommentSection";
import BackToListButton from "@/components/UI/BackToListButton";

export default function ItemPage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && id) {
      const fetchArticle = async () => {
        try {
          const articleIdNumber = Number(id);
          const articleData = await getArticleDetail(articleIdNumber);
          setArticle(articleData);
        } catch (err) {
          console.error(err);
          setError("게시글 정보를 불러오는 중 오류가 발생했습니다.");
        }
      };

      fetchArticle();
    }
  }, [router.isReady, id]);

  if (error) {
    alert(`오류: ${error}`);
  }

  if (!article)
    return (
      <>
        <div className="container mx-auto pt-24 px-4">게시글이 없습니다.</div>
        <BackToListButton path="/community" />
      </>
    );

  return (
    <>
      <div className="container mx-auto pt-24 px-4">
        <ArticleDetailSection articleDetail={article} />
        <hr className="my-6 border-t border-gray-200" />
        <ArticleCommentSection articleId={article.id} />
      </div>
      <BackToListButton path="/community" />
    </>
  );
}
