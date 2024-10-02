// src/components/UI/articles/BestArticlesSection.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  Article,
  ArticleListResponse,
  ArticleSortOption,
} from "@/types/article";
import useViewport from "@/hooks/useViewport";
import BestArticleCard from "./BestArticleCard";
import { getArticles } from "@/api/article";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";

// 화면 크기에 따른 pageSize 결정 함수 (클라이언트에서만 동작)
const getPageSize = () => {
  if (typeof window !== "undefined") {
    // 클라이언트 측에서만 실행
    const width = window.innerWidth;
    if (width < 768) {
      return 1; // Mobile viewport
    } else if (width < 1280) {
      return 2; // Tablet viewport
    } else {
      return 3; // Desktop viewport
    }
  }
  return 3; // 기본값 (서버 측에서는 실행되지 않음)
};

const BestArticlesSection = () => {
  const [articles, setArticles] = useState<Article[]>([]); // 베스트 게시글 리스트
  const [pageSize, setPageSize] = useState<number>(getPageSize()); // 페이지 사이즈
  const viewportWidth = useViewport(); // 현재 뷰포트 너비를 감지하는 커스텀 훅
  const [isLoading, setIsLoading] = useAtom(loadingAtom); // 로딩 상태 관리
  const [imagesLoaded, setImagesLoaded] = useState(0); // 로드된 이미지 수 관리

  const fetchBestArticles = useCallback(
    async ({
      pageSize,
      orderBy,
    }: {
      pageSize: number;
      orderBy: ArticleSortOption;
    }) => {
      setIsLoading(true);
      try {
        const data: ArticleListResponse = await getArticles({
          page: 1,
          pageSize,
          orderBy,
        });
        setArticles(data.list); // 게시글 목록 업데이트
      } catch (error) {
        console.error(
          "Failed to fetch best articles:",
          (error as Error).message
        );
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  useEffect(() => {
    const newPageSize = getPageSize(); // 페이지 크기 변경
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize); // 페이지 사이즈 업데이트
      const currentOrderBy = "like"; // 인기순으로 정렬
      fetchBestArticles({ pageSize: newPageSize, orderBy: currentOrderBy });
    }
  }, [viewportWidth, pageSize, fetchBestArticles]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (imagesLoaded === articles.length && articles.length > 0) {
      setIsLoading(false);
    }
  }, [imagesLoaded, articles.length, setIsLoading]);

  return (
    <div className="bg-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-gray-800 mb-6">
          베스트 게시글
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner isLoading={isLoading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <BestArticleCard
                key={`best-article-${article.id}`}
                article={article}
                onLoad={handleImageLoad} // 이미지 로드 이벤트 핸들러
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestArticlesSection;
