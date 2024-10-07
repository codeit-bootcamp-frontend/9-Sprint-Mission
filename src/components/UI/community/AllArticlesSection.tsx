// src/components/UI/community/AllArticlesSection.tsx
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import PaginationBar from "@/components/UI/PaginationBar";
import { Article, ArticleSortOption } from "@/types/article";
import { getArticles } from "@/api/article";
import AllArticleCard from "./AllArticleCard";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";
import useDebounce from "@/hooks/useDebounce";
import useThrottle from "@/hooks/useThrottle"; // 커스텀 훅 사용

const WRITE_BUTTON_IMAGE = "/images/ui/write_small_40.png";

// 한 페이지당 표시할 게시글 수
const PAGE_SIZE = 5;

// 화면 너비에 따라 무한 스크롤 사용 여부를 결정 (768px 미만에서만 무한 스크롤)
const isInfiniteScroll = (width: number) => width < 768;

const AllArticlesSection = () => {
  const [orderBy, setOrderBy] = useState<ArticleSortOption>("recent");
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const observer = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  // SSR 호환성을 위해 초기 무한 스크롤 상태를 기본값으로 설정
  const [isMobileInfiniteScroll, setIsMobileInfiniteScroll] = useState(false);

  // 화면 리사이즈 시 무한 스크롤 여부 결정
  useEffect(() => {
    const handleResize = () => {
      setIsMobileInfiniteScroll(isInfiniteScroll(window.innerWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 모바일 사이즈에서 무한 스크롤 적용 (쓰로틀 사용)
  const throttledScroll = useThrottle(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      hasMore &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1); // 페이지 증가
    }
  }, 300); // 300ms의 쓰로틀 적용

  // 무한 스크롤 모드일 때만 스크롤 이벤트 등록
  useEffect(() => {
    if (!isMobileInfiniteScroll) {
      window.removeEventListener("scroll", throttledScroll); // 모바일이 아니면 스크롤 이벤트 제거
      return;
    }

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [isMobileInfiniteScroll, hasMore, isLoading, throttledScroll]);

  // 마지막 게시글 요소를 참조하는 IntersectionObserver 설정 (모바일에서만 무한 스크롤)
  const lastArticleElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !isMobileInfiniteScroll) return; // 무한 스크롤 모드가 아닐 때는 동작하지 않음
      if (observer.current) observer.current.disconnect(); // 이전 옵저버 해제

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 } // 요소가 완전히 화면에 나타났을 때만 트리거
      );

      if (node) observer.current.observe(node); // 마지막 요소 관찰 시작
    },
    [isLoading, hasMore, isMobileInfiniteScroll]
  );

  // 정렬 옵션 선택 핸들러
  const handleSortSelection = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption);
    setPage(1);
    setArticles([]); // 게시글 목록 초기화
  };

  // 검색어 입력 핸들러
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  // useMemo를 사용하여 쿼리 객체 메모이제이션
  const memoizedQuery = useMemo(() => {
    const query = { ...router.query };
    if (debouncedSearchKeyword.trim()) {
      query.q = debouncedSearchKeyword;
    } else {
      delete query.q;
    }
    return query;
  }, [router.query, debouncedSearchKeyword]);

  // useCallback을 사용하여 함수 메모이제이션
  const updateRouterQuery = useCallback(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: memoizedQuery,
      },
      undefined,
      { shallow: true }
    );
  }, [router, memoizedQuery]);

  // 디바운스된 검색어로 라우터 쿼리 업데이트 및 게시글 목록 초기화
  useEffect(() => {
    updateRouterQuery();
    setPage(1);
    setArticles([]);
  }, [debouncedSearchKeyword, updateRouterQuery]);

  // fetchArticles 함수를 useCallback으로 메모이제이션
  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        orderBy,
        page,
        pageSize: PAGE_SIZE,
        keyword: debouncedSearchKeyword.trim()
          ? debouncedSearchKeyword
          : undefined,
      };
      const data = await getArticles(params);

      setArticles((prevArticles) =>
        isMobileInfiniteScroll ? [...prevArticles, ...data.list] : data.list
      );

      setHasMore(data.list.length === PAGE_SIZE);
      setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    orderBy,
    page,
    debouncedSearchKeyword,
    isMobileInfiniteScroll,
    setIsLoading,
  ]);

  // 게시글을 불러오는 useEffect
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div className="bg-white px-4 max-w-[1200px] mx-auto" ref={containerRef}>
      <div className="flex justify-between items-center">
        <div className="mb-6 text-2xl font-bold text-gray-800">게시글</div>
        <Link href="/addArticle">
          <Image
            src={WRITE_BUTTON_IMAGE}
            alt="글쓰기"
            width={88}
            height={42}
            className="cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar onSearch={handleSearch} className="w-full md:w-96" />
        <DropdownMenu<ArticleSortOption>
          onSortSelection={handleSortSelection}
          type="article"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {articles.length
          ? articles.map((article, index) => (
              <div
                key={`article-${article.id}`}
                ref={
                  isMobileInfiniteScroll && index === articles.length - 1
                    ? lastArticleElementRef // 모바일에서 마지막 게시글에 옵저버 연결
                    : null
                }
              >
                <AllArticleCard article={article} currentPage={page} />
              </div>
            ))
          : debouncedSearchKeyword && (
              <div>
                <span>검색된 결과가 없습니다.</span>
              </div>
            )}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-20">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      )}

      {!isMobileInfiniteScroll && totalPages > 1 && (
        <div className="pt-10 pb-20">
          <PaginationBar
            totalPageNum={totalPages}
            activePageNum={page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default AllArticlesSection;
