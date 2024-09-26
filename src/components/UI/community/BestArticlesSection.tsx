// src/components/UI/articles/BestArticlesSection.tsx
import { useEffect, useState } from "react";
import { Article } from "@/types/article";
import useViewport from "@/hooks/useViewport";
import BestArticleCard from "./BestArticleCard"; // 불러오기
import { getArticles } from "@/api/article";

const getPageSize = (width: number): number => {
  if (width < 768) {
    return 1; // Mobile viewport
  } else if (width < 1280) {
    return 2; // Tablet viewport
  } else {
    return 3; // Desktop viewport
  }
};

const BestArticlesSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const viewportWidth = useViewport();

  useEffect(() => {
    if (viewportWidth === 0) return;

    const newPageSize = getPageSize(viewportWidth);

    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);

      const fetchBestArticles = async (size: number) => {
        try {
          const data = await getArticles({ orderBy: "like", pageSize: size });
          setArticles(data.list);
        } catch (error) {
          console.error("Failed to fetch best articles:", error);
        }
      };

      fetchBestArticles(newPageSize);
    }
  }, [viewportWidth, pageSize]);

  return (
    <div className="bg-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-gray-800 mb-6">
          베스트 게시글
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BestArticleCard
              key={`best-article-${article.id}`}
              article={article}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestArticlesSection;
