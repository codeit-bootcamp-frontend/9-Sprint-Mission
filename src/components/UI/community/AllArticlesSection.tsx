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

// public 폴더 경로 문자열로 대체
const WriteButtonImage = "/images/ui/write_small_40.png";

const PAGE_SIZE = 5; // 한 번에 불러올 게시글 수

// 화면 크기에 따라 페이지네이션 여부를 결정하는 함수
const isPageNation = () => {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    return width >= 768; // 태블릿 또는 데스크탑에서는 페이지네이션 활성화
  }
  return true; // 기본적으로 페이지네이션 활성화
};

const AllArticlesSection = () => {
  const [orderBy, setOrderBy] = useState<ArticleSortOption>("recent"); // 정렬 기준
  const [articles, setArticles] = useState<Article[]>([]); // 게시글 리스트 상태
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 더 불러올 게시글이 있는지 여부
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const router = useRouter(); // Next.js 라우터
  const keyword = (router.query.q as string) || ""; // 검색 키워드
  const [isLoading, setIsLoading] = useAtom(loadingAtom); // 로딩 상태
  const observer = useRef<IntersectionObserver | null>(null); // 무한 스크롤용 옵저버
  const containerRef = useRef<HTMLDivElement>(null); // 게시글 리스트 컨테이너 참조
  const [isPagination, setIsPagination] = useState(isPageNation()); // 페이지네이션 여부

  // 화면 크기 변경 시 페이지네이션 여부를 재설정
  useEffect(() => {
    const handleResize = () => {
      setIsPagination(isPageNation());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 라우트 변경 시 스크롤 처리 (무한 스크롤 시 페이지 이동 후 자동 스크롤)
  const handleRouteChange = useCallback(() => {
    if (page > 1) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [page]);

  // 라우트 변경 이벤트 리스너 등록
  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, handleRouteChange]);

  // 무한 스크롤 구현 - 마지막 게시글이 화면에 보이면 다음 페이지 불러옴
  const lastArticleElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isPagination) return; // 로딩 중이거나 페이지네이션 중이면 실행 안 함
      if (observer.current) observer.current.disconnect(); // 이전 옵저버 해제
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
        }
      });
      if (node) observer.current.observe(node); // 새 요소에 옵저버 적용
    },
    [isLoading, hasMore, isPagination]
  );

  // 정렬 옵션 변경 시 호출되는 함수
  const handleSortSelection = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption); // 선택된 정렬 기준으로 설정
    setPage(1); // 페이지를 1로 초기화
    setArticles([]); // 게시글 목록 초기화
  };

  // 검색어 입력 시 호출되는 함수
  const handleSearch = (searchKeyword: string) => {
    const query = { ...router.query }; // 기존 쿼리 유지
    if (searchKeyword.trim()) {
      query.q = searchKeyword; // 검색어가 있으면 쿼리에 추가
    } else {
      delete query.q; // 검색어가 없으면 쿼리에서 제거
    }
    router.replace({
      pathname: router.pathname,
      query,
    });
    setPage(1); // 페이지를 1로 초기화
    setArticles([]); // 게시글 목록 초기화
  };

  // 게시글 목록을 API에서 가져오는 함수
  const fetchArticles = useCallback(async () => {
    if (keyword === undefined) return; // 검색어가 없으면 실행 안 함
    setIsLoading(true); // 로딩 상태 활성화
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
        params.keyword = keyword; // 검색어가 있으면 params에 추가
      }
      const data = await getArticles(params); // API 호출
      setArticles((prevArticles) =>
        isPagination || page === 1 ? data.list : [...prevArticles, ...data.list]
      ); // 페이지 1일 때는 새로운 목록으로 대체, 그 외에는 기존 목록에 추가
      setHasMore(data.list.length === PAGE_SIZE); // 남은 게시글이 있는지 여부 확인
      const calculatedTotalPages = Math.ceil(data.totalCount / PAGE_SIZE); // 전체 페이지 수 계산
      setTotalPages(calculatedTotalPages); // 전체 페이지 수 업데이트
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다:", error);
    } finally {
      setIsLoading(false); // 로딩 상태 비활성화
    }
  }, [orderBy, keyword, page, isPagination, setIsLoading]);

  // 게시글 데이터를 가져오는 useEffect
  useEffect(() => {
    fetchArticles(); // 의존성 배열의 값이 변경될 때마다 API 호출
  }, [orderBy, keyword, page, fetchArticles]);

  return (
    <div className="bg-white px-4 max-w-[1200px] mx-auto" ref={containerRef}>
      {/* 게시글 타이틀 및 글쓰기 버튼 */}
      <div className="flex justify-between items-center">
        <div className="mb-6 text-2xl font-bold text-gray-800">게시글</div>
        {/* 글쓰기 버튼 클릭 시 /addArticle 경로로 이동 */}
        <Link href="/addArticle">
          <Image
            src={WriteButtonImage}
            alt="글쓰기"
            width={88} // 이미지의 너비
            height={42} // 이미지의 높이
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* 검색 및 정렬 옵션 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar onSearch={handleSearch} className="w-full md:w-96" />
        <DropdownMenu<ArticleSortOption>
          onSortSelection={handleSortSelection}
          type="article"
        />
      </div>

      {/* 게시글 목록 - 한 줄에 하나씩 나오도록 설정 */}
      <div className="grid grid-cols-1 gap-6">
        {" "}
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
                {/* currentPage 전달 */}
                <AllArticleCard article={article} currentPage={page} />{" "}
              </div>
            ))
          : keyword && (
              <div>
                <span>검색된 결과가 없습니다.</span>
              </div>
            )}
      </div>

      {/* 로딩 스피너 */}
      {isLoading && (
        <div className="flex justify-center items-center h-20">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      )}

      {/* 페이지네이션 */}
      {isPagination && totalPages > 1 && (
        <div className="pt-10 pb-20">
          <PaginationBar
            totalPageNum={totalPages} // 전체 페이지 수
            activePageNum={page} // 현재 페이지 번호
            onPageChange={(newPage) => {
              setPage(newPage); // 페이지 변경
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AllArticlesSection;
