// src/components/UI/articles/BestArticlesSection.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  Article,
  ArticleListResponse,
  ArticleSortOption,
} from "@/types/article";
import BestArticleCard from "./BestArticleCard";
import { getArticles } from "@/api/articles/getArticles";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";
import useDebounce from "@/hooks/useDebounce";

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
  const [articles, setArticles] = useState<Article[]>([]); // 베스트 게시글 리스트
  const [isLoading, setIsLoading] = useAtom(loadingAtom); // 로딩 상태 관리
  const [imagesLoaded, setImagesLoaded] = useState(0); // 로드된 이미지 수 관리

  // 창 너비 상태 관리
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // 디바운스된 창 너비
  const debouncedWindowWidth = useDebounce(windowWidth, 300); // 300ms 지연

  // 베스트 게시글을 가져오는 함수
  const fetchBestArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const pageSize = getPageSize(debouncedWindowWidth);
      const data: ArticleListResponse = await getArticles({
        page: 1,
        pageSize: pageSize,
        orderBy: orderBy,
      });
      setArticles(data.list); // 게시글 목록 업데이트
    } catch (error) {
      console.error("Failed to fetch best articles:", error); // 에러 로그 추가
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, orderBy, debouncedWindowWidth]);

  // 창 크기 변경 시 windowWidth 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 초기 로딩 시에도 windowWidth 설정
    handleResize();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // debouncedWindowWidth가 변경될 때마다 fetchBestArticles 호출
  useEffect(() => {
    fetchBestArticles();
  }, [debouncedWindowWidth, fetchBestArticles]);

  // 이미지 로드 완료 시 호출되는 함수
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // 로딩 상태 관리
  useEffect(() => {
    if (imagesLoaded === articles.length && articles.length > 0) {
      setIsLoading(false);
    }
  }, [imagesLoaded, articles.length, setIsLoading]);

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
            <BestArticleCard
              key={`best-article-${article.id}`}
              article={article}
              onLoad={handleImageLoad}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestArticlesSection;
