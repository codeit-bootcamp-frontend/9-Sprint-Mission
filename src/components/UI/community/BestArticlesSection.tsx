// src/components/UI/community/BestArticlesSection.tsx
import React, { useEffect, useState } from "react";
import { ArticleSortOption } from "@/types/article";
import BestArticleCard from "./BestArticleCard";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import useDebounce from "@/hooks/useDebounce";
import { useArticle } from "@/hooks/useArticle";

// 화면 크기에 따른 pageSize 결정 함수
const getPageSize = (width: number) => {
  if (width < 768) {
    return 1; // 모바일 화면
  } else if (width < 1280) {
    return 2; // 태블릿 화면
  } else {
    return 3; // 데스크탑 화면
  }
};

const BestArticlesSection = () => {
  const [orderBy] = useState<ArticleSortOption>("like");
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);
  const debouncedWindowWidth = useDebounce(windowWidth, 300);

  // useArticle 훅 사용
  const { useArticles } = useArticle();
  const { data, isPending: isLoading } = useArticles({
    page: 1,
    pageSize: getPageSize(debouncedWindowWidth),
    orderBy,
  });

  const articles = data?.list ?? [];

  // 창 크기 변경 시 windowWidth 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-white px-4 py-6 mt-14 md:py-6 md:mt-16 lg:py-8 lg:mt-16 max-w-[1200px] mx-auto">
      <div className="mb-6 text-2xl font-bold text-gray-800">베스트 게시글</div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BestArticleCard key={`best-article-${article.id}`} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestArticlesSection;
