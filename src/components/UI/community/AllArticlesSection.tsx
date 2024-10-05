// src/components/UI/community/AllArticlesSection.tsx
import { useEffect, useState, useRef, useCallback } from "react";
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

const WriteButtonImage = "/images/ui/write_small_40.png";

// 한 페이지당 표시할 게시글 수
const PAGE_SIZE = 5;

// 화면 너비에 따라 페이지네이션 사용 여부를 결정
const isPageNation = (width: number) => width >= 768;

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

  // SSR 호환성을 위해 초기 상태를 기본값으로 설정
  const [isPagination, setIsPagination] = useState(false);

  // 화면 리사이즈 시 페이지네이션 여부 결정
  useEffect(() => {
    const handleResize = () => {
      setIsPagination(isPageNation(window.innerWidth));
    };
    // 컴포넌트 마운트 시 초기 설정
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 마지막 게시글 요소를 참조하는 IntersectionObserver 설정
  const lastArticleElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isPagination) return;
      if (observer.current) observer.current.disconnect(); // 이전 옵저버 해제

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      ); // 요소가 완전히 화면에 나타났을 때만 트리거

      if (node) observer.current.observe(node); // 마지막 요소 관찰 시작
    },
    [isLoading, hasMore, isPagination]
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

  // 디바운스된 검색어로 라우터 쿼리 업데이트 및 게시글 목록 초기화
  useEffect(() => {
    const query = { ...router.query };

    // 검색어가 변경된 경우에만 쿼리 업데이트
    if (debouncedSearchKeyword.trim()) {
      query.q = debouncedSearchKeyword;
    } else {
      delete query.q;
    }

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true } // 페이지를 다시 로드하지 않음
    );

    setPage(1); // 검색어 변경 시 페이지 초기화
    setArticles([]); // 새로운 데이터 불러오기 전 게시글 목록 초기화
  }, [debouncedSearchKeyword, router.pathname]); // 검색어 또는 경로 변경 시만 실행

  // 게시글을 불러오는 비동기 함수
  useEffect(() => {
    const fetchArticles = async () => {
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

        setArticles(
          (prevArticles) =>
            isPagination || page === 1
              ? data.list
              : [...prevArticles, ...data.list] // 새로 불러온 게시글을 기존 게시글 뒤에 추가
        );

        setHasMore(data.list.length === PAGE_SIZE); // 다음 페이지가 있는지 여부 확인
        setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
      } catch (error) {
        console.error("게시글을 불러오는 데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [orderBy, debouncedSearchKeyword, page, isPagination]);

  return (
    <div className="bg-white px-4 max-w-[1200px] mx-auto" ref={containerRef}>
      <div className="flex justify-between items-center">
        <div className="mb-6 text-2xl font-bold text-gray-800">게시글</div>
        <Link href="/addArticle">
          <Image
            src={WriteButtonImage}
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
                  !isPagination && index === articles.length - 1
                    ? lastArticleElementRef // 마지막 게시글에 옵저버 연결
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

      {isPagination && totalPages > 1 && (
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
