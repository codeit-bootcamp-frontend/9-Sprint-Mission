// src/components/UI/community/AllArticlesSection.tsx
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import EmptyState from "@/components/UI/EmptyState";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import PaginationBar from "@/components/UI/PaginationBar";
import { Article, ArticleSortOption } from "@/types/article";
import { getArticles } from "@/api/article";
import AllArticleCard from "./AllArticleCard";
import WriteButtonImage from "@/images/ui/write_small_40.png";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";

const PAGE_SIZE = 5;

const isPageNation = () => {
  if (typeof window !== "undefined") {
    // 클라이언트 측에서만 실행
    const width = window.innerWidth;
    if (width < 768) {
      return false; // Mobile viewport
    } else {
      return true; // Tablet, Desktop viewport
    }
  }
  return true; // 기본값
};

const AllArticlesSection = () => {
  const [orderBy, setOrderBy] = useState<ArticleSortOption>("recent");
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const keyword = (router.query.q as string) || "";
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const observer = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPagination, setIsPagination] = useState(isPageNation());

  // 윈도우 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsPagination(isPageNation());
    };

    handleResize(); // 초기 렌더링 시에도 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 페이지 이동 후 조건부 스크롤 처리
  const handleRouteChange = useCallback(() => {
    if (page > 1) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [page]);

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, handleRouteChange]);

  // 무한 스크롤 처리
  const lastArticleElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isPagination) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, isPagination]
  );

  // 정렬 옵션 변경
  const handleSortSelection = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption);
    setPage(1);
    setArticles([]); // 정렬 변경 시 기존 데이터 초기화
  };

  // 검색 처리
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
    setPage(1);
    setArticles([]); // 검색어 변경 시 기존 데이터 초기화
  };

  // API에서 데이터 가져오기
  const fetchArticles = useCallback(async () => {
    if (keyword === undefined) return; // 검색어가 없으면 요청하지 않음
    setIsLoading(true);
    try {
      const params: {
        orderBy: ArticleSortOption;
        keyword?: string;
        page: number;
        pageSize: number;
      } = {
        orderBy,
        page,
        pageSize: PAGE_SIZE,
      };
      if (keyword.trim()) {
        params.keyword = keyword;
      }
      const data = await getArticles(params);
      setArticles((prevArticles) =>
        isPagination || page === 1 ? data.list : [...prevArticles, ...data.list]
      );
      setHasMore(data.list.length === PAGE_SIZE);
      const calculatedTotalPages = Math.ceil(data.totalCount / PAGE_SIZE);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, keyword, page, isPagination, setIsLoading]);

  // 페이지네이션 및 무한 스크롤 데이터 로드
  useEffect(() => {
    fetchArticles(); // 컴포넌트 렌더링 시 데이터 로드
  }, [orderBy, keyword, page, fetchArticles]);

  return (
    <div
      className="mt-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
      ref={containerRef}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-gray-800">게시글</div>
        <Link href="/addArticle">
          <Image src={WriteButtonImage} alt="글쓰기" width={88} height={42} />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar onSearch={handleSearch} className="w-full md:w-96" />
        <DropdownMenu<ArticleSortOption>
          onSortSelection={handleSortSelection}
          type="article"
        />
      </div>

      <div className="space-y-6">
        {articles.length
          ? articles.map((article, index) => (
              <div
                key={`article-${article.id}`}
                ref={
                  !isPagination && index === articles.length - 1
                    ? lastArticleElementRef
                    : null
                }
              >
                <AllArticleCard article={article} />
              </div>
            ))
          : keyword && (
              <EmptyState text={`'${keyword}'로 검색된 결과가 없어요.`} />
            )}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-20">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      )}

      {isPagination && totalPages > 1 && (
        <div className="pt-10 pb-20">
          <PaginationBar
            totalPageNum={totalPages}
            activePageNum={page}
            onPageChange={(newPage) => {
              setPage(newPage);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AllArticlesSection;
