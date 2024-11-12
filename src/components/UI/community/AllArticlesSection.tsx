// src/components/UI/community/AllArticlesSection.tsx
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useArticle } from "@/hooks/useArticle";
import PaginationBar from "@/components/UI/PaginationBar";
import useViewport from "@/hooks/useViewport";
import { Article } from "@/types/article";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { ArticleSortOption } from "@/types/article";
import { Heart } from "lucide-react";

const AllArticlesSection = () => {
  const { ref, inView } = useInView();
  const width = useViewport();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState<ArticleSortOption>("recent");
  const PAGE_SIZE = 10;

  const isMobile = width < 768;
  const { useArticles, useInfiniteArticles } = useArticle();

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteArticles({
    pageSize: PAGE_SIZE,
    orderBy: sortOption,
    keyword: searchKeyword,
    enabled: isMobile,
  });

  const { data: paginatedData, isLoading } = useArticles({
    page: currentPage,
    pageSize: PAGE_SIZE,
    orderBy: sortOption,
    keyword: searchKeyword,
    enabled: !isMobile,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && isMobile) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, isMobile, fetchNextPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const handleSortSelection = (option: ArticleSortOption) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">게시글</h2>
          <Link
            href="/addArticle"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            글쓰기
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <SearchBar onSearch={handleSearch} className="w-full md:w-96" placeholder="검색어를 입력해 주세요" />
          <DropdownMenu onSortSelection={(value) => handleSortSelection(value as ArticleSortOption)} type="article" />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner isLoading={isLoading} />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {(isMobile ? infiniteData?.pages.flatMap((page) => page.list) : paginatedData?.list)?.map(
                (article: Article) => (
                  <div
                    key={article.id}
                    className="flex items-start gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <Link href={`/community/${article.id}`} className="block">
                        <h3 className="font-medium mb-2 hover:text-blue-500">{article.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{article.writer?.nickname || "알 수 없음"}</span>
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                      </Link>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {article.image && (
                        <div className="w-20 h-20 relative">
                          <Image src={article.image} alt="Article thumbnail" fill className="object-cover rounded" />
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Heart className="w-4 h-4" />
                        <span>{article.likeCount || 0}</span>
                      </div>
                    </div>
                  </div>
                )
              )}
              {isMobile && (
                <div ref={ref} className="h-10">
                  {isFetchingNextPage && <LoadingSpinner isLoading={true} />}
                </div>
              )}
            </div>

            {!isMobile && paginatedData && (
              <div className="mt-8">
                <PaginationBar
                  totalPageNum={Math.ceil(paginatedData.totalCount / PAGE_SIZE)}
                  activePageNum={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllArticlesSection;
