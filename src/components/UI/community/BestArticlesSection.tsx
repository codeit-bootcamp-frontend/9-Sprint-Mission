import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@/types/article";
import MedalIcon from "@/images/icons/ic_medal.svg";
import useViewport from "@/hooks/useViewport";
import LikeCountDisplay from "@/components/UI/LikeCountDisplay";
import { getArticles } from "@/api/article";

const BestArticleCard = ({ article }: { article: Article }) => {
  const dateString = format(article.createdAt, "yyyy. MM. dd");

  return (
    <Link
      href={`/community/${article.id}`}
      className="bg-gray-50 rounded-lg block"
    >
      <div className="inline-flex items-center bg-blue-500 text-white text-base font-semibold rounded-b-3xl px-6 py-2 ml-6 gap-1">
        <MedalIcon alt="베스트 게시글" />
        Best
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex gap-2 min-h-[72px]">
          <div className="text-lg font-semibold flex-1">{article.title}</div>
          {article.image && (
            <div className="bg-white border border-gray-200 w-[72px] h-[72px] rounded-lg p-3">
              <div className="relative w-full h-full">
                <Image
                  fill
                  src={article.image}
                  alt={`${article.id}번 게시글 이미지`}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            {article.writer.nickname}
            <LikeCountDisplay count={article.likeCount} fontSize={14} />
          </div>
          <span className="text-sm text-gray-400">{dateString}</span>
        </div>
      </div>
    </Link>
  );
};

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
