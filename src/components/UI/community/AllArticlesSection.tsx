// src/components/UI/community/AllArticlesSection.tsx
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import PaginationBar from "@/components/UI/PaginationBar";
import { Article, ArticleSortOption } from "@/types/article";
import { getArticles } from "@/api/articles/getArticles";
import AllArticleCard from "./AllArticleCard";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";
import useDebounce from "@/hooks/useDebounce";
import useThrottle from "@/hooks/useThrottle";

const WRITE_BUTTON_IMAGE = "/images/ui/write_small_40.png";
const PAGE_SIZE = 5;

// 화면 너비에 따라 무한 스크롤 사용 여부를 결정 (768px 미만에서만 무한 스크롤)
const isInfiniteScroll = (width: number) => width < 768;

const AllArticlesSection = () => {
  const [orderBy, setOrderBy] = useState<ArticleSortOption>("recent");
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const observer = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const [isMobileInfiniteScroll, setIsMobileInfiniteScroll] = useState<
    boolean | null
  >(null);

  // 상태 값을 참조하기 위한 레퍼런스
  const isLoadingRef = useRef(isLoading);
  const pageRef = useRef(page);
  const totalPagesRef = useRef(totalPages);

  // 상태 값 변경 시 레퍼런스 업데이트
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    totalPagesRef.current = totalPages;
  }, [totalPages]);

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

  // 모바일 사이즈에서 무한 스크롤 적용 (쓰로틀 사용)
  const throttledScroll = useThrottle(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isLoadingRef.current &&
      pageRef.current < totalPagesRef.current
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 300);

  useEffect(() => {
    if (isMobileInfiniteScroll) {
      window.addEventListener("scroll", throttledScroll);
      return () => {
        window.removeEventListener("scroll", throttledScroll);
      };
    }
  }, [isMobileInfiniteScroll, throttledScroll]);

  // useMemo를 사용하여 쿼리 객체 메모이제이션
  const memoizedQuery = useMemo(() => {
    const query: Record<string, string> = {};
    if (debouncedSearchKeyword.trim()) {
      query.q = debouncedSearchKeyword;
    }
    return query;
  }, [debouncedSearchKeyword]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, memoizedQuery]);

  // 디바운스된 검색어로 라우터 쿼리 업데이트 및 페이지 초기화
  useEffect(() => {
    updateRouterQuery();
    setPage(1);
  }, [debouncedSearchKeyword, updateRouterQuery]);

  // fetchSortedData 함수를 useCallback으로 메모이제이션
  const fetchSortedData = useCallback(async () => {
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
        page === 1 || isMobileInfiniteScroll === false
          ? data.list
          : [...prevArticles, ...data.list]
      );

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
    // isMobileInfiniteScroll이 null이 아닐 때만 fetchArticles 호출
    if (isMobileInfiniteScroll !== null) {
      fetchSortedData();
    }
  }, [fetchSortedData, isMobileInfiniteScroll]);

  // 정렬 옵션 선택 핸들러
  const handleSortSelection = useCallback(
    (sortOption: ArticleSortOption) => {
      if (sortOption !== orderBy) {
        setOrderBy(sortOption);
        setPage(1);
      }
    },
    [orderBy]
  );

  // 검색어 입력 핸들러
  const handleSearch = useCallback((keyword: string) => {
    setSearchKeyword(keyword);
  }, []);

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

      {isLoading && articles.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div
                key={`article-${article.id}`}
                ref={
                  isMobileInfiniteScroll && index === articles.length - 1
                    ? (el: HTMLDivElement | null) =>
                        observer.current?.observe(el as Element)
                    : undefined
                }
              >
                <AllArticleCard article={article} currentPage={page} />
              </div>
            ))
          ) : !isLoading && debouncedSearchKeyword ? (
            <div>
              <span>검색된 결과가 없습니다.</span>
            </div>
          ) : null}
        </div>
      )}

      {isLoading && articles.length > 0 && (
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
