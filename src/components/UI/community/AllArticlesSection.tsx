// src/components/UI/community/AllArticlesSection.tsx
import React, { useState } from "react";
import { useArticle } from "@/hooks/useArticle";
import PaginationBar from "@/components/UI/PaginationBar";
import Link from "next/link";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { ArticleSortOption } from "@/types/article";
import AllArticleCard from "./AllArticleCard";
import useDebounce from "@/hooks/useDebounce";

const AllArticlesSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState<ArticleSortOption>("recent");
  const PAGE_SIZE = 10;

  const debouncedKeyword = useDebounce(searchKeyword, 500);

  const { useArticles } = useArticle();

  const { data, isLoading } = useArticles({
    page: currentPage,
    pageSize: PAGE_SIZE,
    orderBy: sortOption,
    keyword: debouncedKeyword,
  });

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

  if (isLoading) {
    return <LoadingSpinner isLoading={true} />;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">게시글</h2>
          <div className="flex items-center gap-4">
            <div className="w-80">
              <SearchBar onSearch={handleSearch} placeholder="제목을 검색해주세요" />
            </div>
            <Link
              href="/addArticle"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              글쓰기
            </Link>
            <div className="w-48">
              <DropdownMenu
                onSortSelection={(value) => handleSortSelection(value as ArticleSortOption)}
                type="article"
              />
            </div>
          </div>
        </div>

        {!data?.list?.length ? (
          <div className="text-center py-12 text-gray-500">검색 결과가 없습니다.</div>
        ) : (
          <div className="space-y-4">
            {data.list.map((article) => (
              <AllArticleCard key={article.id} article={article} currentPage={currentPage} />
            ))}
          </div>
        )}

        {data && data.totalCount > 0 && (
          <div className="mt-8 flex justify-center">
            <PaginationBar
              totalPageNum={Math.ceil(data.totalCount / PAGE_SIZE)}
              activePageNum={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllArticlesSection;
