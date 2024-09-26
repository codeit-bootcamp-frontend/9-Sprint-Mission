import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import EmptyState from "@/components/UI/EmptyState";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Article, ArticleSortOption } from "@/types/article";
import { getArticles } from "@/api/article";
import AllArticleCard from "./AllArticleCard";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";

interface AllArticlesSectionProps {
  initialArticles: Article[];
}

const AllArticlesSection = ({ initialArticles }: AllArticlesSectionProps) => {
  const [orderBy, setOrderBy] = useState<ArticleSortOption>("recent");
  const [articles, setArticles] = useState(initialArticles);
  const router = useRouter();
  const keyword = (router.query.q as string) || "";
  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  const handleSortSelection = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption);
  };

  const handleSearch = (searchKeyword: string) => {
    const query = { ...router.query };
    if (searchKeyword.trim()) {
      query.q = searchKeyword;
    } else {
      delete query.q;
    }
    router.replace({
      pathname: router.pathname,
      query,
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const params: { orderBy: ArticleSortOption; keyword?: string } = {
          orderBy,
        };
        if (keyword.trim()) {
          params.keyword = keyword;
        }
        const data = await getArticles(params);
        setArticles(data.list);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [orderBy, keyword, setIsLoading]);

  return (
    <div className="mt-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-gray-800">게시글</div>
        <Link
          href="/addArticle"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-600"
        >
          글쓰기
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar onSearch={handleSearch} className="w-full md:w-96" />
        <DropdownMenu<ArticleSortOption>
          onSortSelection={(sortOption) => handleSortSelection(sortOption)}
          type="article"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      ) : (
        <div className="space-y-6">
          {articles.length
            ? articles.map((article) => (
                <AllArticleCard
                  key={`article-${article.id}`}
                  article={article}
                />
              ))
            : keyword && (
                <EmptyState text={`'${keyword}'로 검색된 결과가 없어요.`} />
              )}
        </div>
      )}
    </div>
  );
};

export default AllArticlesSection;
