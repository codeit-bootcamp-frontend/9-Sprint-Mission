// src/components/UI/community/LikeCommunitySection.tsx
import React, { useEffect, useState } from "react";
import CommunityCard from "./CommunityCard";
import { getArticles } from "@/api/article";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import {
  Article,
  ArticleListResponse,
  ArticleSortOption,
} from "@/types/article";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1280) {
    return 2;
  } else {
    return 4;
  }
};

interface BestArticlesSectionProps {
  width: number;
  height: number;
}

const BestArticlesSection = ({ width, height }: BestArticlesSectionProps) => {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [isLoading, setIsLoading] = useState(true);

  const fetchSortedData = async ({
    orderBy,
    pageSize,
  }: {
    orderBy: ArticleSortOption;
    pageSize: number;
  }) => {
    setIsLoading(true);
    try {
      const response: ArticleListResponse = await getArticles({
        orderBy,
        pageSize,
      });
      setArticleList(response.list);
    } catch (error) {
      console.error("오류: ", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy: "like", pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <div className="py-4 mt-6 md:py-6 md:mt-12 lg:py-8 lg:mt-12">
        <h1 className="text-gray-900 font-bold text-xl mb-4">베스트 상품</h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {articleList?.map((article) => (
            <CommunityCard
              article={article}
              key={`best-article-${article.id}`}
              width={width}
              height={height}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BestArticlesSection;
