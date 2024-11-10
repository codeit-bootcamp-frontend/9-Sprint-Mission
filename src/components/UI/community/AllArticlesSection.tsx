// src/components/UI/community/AllArticlesSection.tsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import PaginationBar from "@/components/UI/PaginationBar";
import { ArticleSortOption } from "@/constants/ArticleSortOption";
import AllArticleCard from "./AllArticleCard";
import useDebounce from "@/hooks/useDebounce";
import { useArticle } from "@/hooks/useArticle";

const WRITE_BUTTON_IMAGE = "/images/ui/write_small_40.png";
const PAGE_SIZE = 5;

// 화면 너비에 따라 무한 스크롤 사용 여부를 결정 (768px 미만에서만 무한 스크롤)
const isInfiniteScroll = (width: number) => width < 768;

const AllArticlesSection = () => {
  const [orderBy, setOrderBy] = useState<ArticleSortOption>(ArticleSortOption.RECENT);
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const [isMobileInfiniteScroll, setIsMobileInfiniteScroll] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // useInfiniteArticles 사용
  const { useInfiniteArticles } = useArticle();
  const {
    articles,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isArticlesLoading,
  } = useInfiniteArticles({
    pageSize: PAGE_SIZE,
    orderBy,
    keyword: debouncedSearchKeyword.trim() ? debouncedSearchKeyword : undefined,
  });

  // 무한 스크롤 관찰자 설정
  const observerRef = useRef<IntersectionObserver>();
  const lastArticleRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isArticlesLoading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
          setCurrentPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isArticlesLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  // 화면 리사이즈 시 무한 스크롤 여부 결정
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobileInfiniteScroll(isInfiniteScroll(window.innerWidth));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 정렬 옵션 선택 핸들러
  const handleSortSelection = useCallback(
    (sortOption: ArticleSortOption) => {
      if (sortOption !== orderBy) {
        setOrderBy(sortOption);
        setCurrentPage(1);
      }
    },
    [orderBy]
  );

  // 검색어 입력 핸들러
  const handleSearch = useCallback((keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  }, []);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="bg-white px-4 max-w-[1200px] mx-auto" ref={containerRef}>
      <div className="flex justify-between items-center">
        <div className="mb-6 text-2xl font-bold text-gray-800">게시글</div>
        <Link href="/addArticle">
          <Image src={WRITE_BUTTON_IMAGE} alt="글쓰기" width={88} height={42} className="cursor-pointer" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar onSearch={handleSearch} className="w-full md:w-96" />
        <DropdownMenu<ArticleSortOption> onSortSelection={handleSortSelection} type="article" />
      </div>

      {isArticlesLoading && articles.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner isLoading={isArticlesLoading} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div
                key={`article-${article.id}`}
                ref={isMobileInfiniteScroll && index === articles.length - 1 ? lastArticleRef : undefined}
              >
                <AllArticleCard article={article} currentPage={currentPage} />
              </div>
            ))
          ) : !isArticlesLoading && debouncedSearchKeyword ? (
            <div>
              <span>검색된 결과가 없습니다.</span>
            </div>
          ) : null}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="flex justify-center items-center h-20">
          <LoadingSpinner isLoading={true} />
        </div>
      )}

      {!isMobileInfiniteScroll && articles.length > 0 && (
        <div className="pt-10 pb-20">
          <PaginationBar
            totalPageNum={Math.ceil(totalCount / PAGE_SIZE)}
            activePageNum={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AllArticlesSection;
