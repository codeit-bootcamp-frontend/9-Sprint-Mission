// src/components/UI/community/AllArticlesSection.tsx
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import EmptyState from "@/components/UI/EmptyState";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Article, ArticleSortOption } from "@/types/article";
import { getArticles } from "@/api/article";
import AllArticleCard from "./AllArticleCard";
import WriteButtonImage from "@/images/ui/write_small_40.png";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";
import styles from "@/styles/AllArticlesSection.module.css"; // 스타일 파일 임포트

interface AllArticlesSectionProps {
  initialArticles: Article[];
}

const LIMIT = 10;

const AllArticlesSection = ({ initialArticles }: AllArticlesSectionProps) => {
  const [orderBy, setOrderBy] = useState<ArticleSortOption>("recent");
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const keyword = (router.query.q as string) || "";
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const observer = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 마지막 게시글 요소의 ref를 감지하여 무한 스크롤 동작을 실행
  const lastArticleElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleSortSelection = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption); // 정렬 기준 업데이트
    setPage(1); // 페이지 번호 초기화
    setArticles([]); // 기존 게시글 목록 초기화
  };

  const handleSearch = (searchKeyword: string) => {
    const query = { ...router.query };
    if (searchKeyword.trim()) {
      query.q = searchKeyword; // 검색어 추가
    } else {
      delete query.q; // 검색어 제거
    }
    router.replace({
      pathname: router.pathname,
      query,
    });
    setPage(1); // 페이지 번호 초기화
    setArticles([]); // 기존 게시글 목록 초기화
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        // API 요청 파라미터 설정
        const params: {
          orderBy: ArticleSortOption;
          keyword?: string;
          page: number;
          limit: number;
        } = {
          orderBy,
          page,
          limit: LIMIT,
        };
        if (keyword.trim()) {
          params.keyword = keyword;
        }
        const data = await getArticles(params);
        setArticles((prevArticles) =>
          page === 1 ? data.list : [...prevArticles, ...data.list]
        ); // 페이지에 따른 데이터 병합
        setHasMore(data.list.length === LIMIT); // 더 가져올 데이터가 있는지 확인
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    fetchArticles();
  }, [orderBy, keyword, page, setIsLoading]); // 정렬, 검색어, 페이지 변경 시 재요청

  return (
    <div
      className={`mt-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto ${styles.container}`}
      ref={containerRef}
    >
      {/* 헤더 영역 */}
      <div
        className={`flex justify-between items-center mb-6 ${styles.header}`}
      >
        <div className="text-2xl font-bold text-gray-800">게시글</div>
        <Link href="/addArticle">
          <Image src={WriteButtonImage} alt="글쓰기" width={88} height={42} />
        </Link>
      </div>

      {/* 검색바 및 정렬 메뉴 */}
      <div
        className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 ${styles.controlBar}`}
      >
        <SearchBar onSearch={handleSearch} className="w-full md:w-96" />
        <DropdownMenu<ArticleSortOption>
          onSortSelection={handleSortSelection}
          type="article"
        />
      </div>

      {/* 게시글 리스트 */}
      <div className="space-y-6">
        {articles.length
          ? articles.map((article, index) => (
              <div
                key={`article-${article.id}`}
                ref={
                  index === articles.length - 1 ? lastArticleElementRef : null
                }
              >
                <AllArticleCard article={article} />
              </div>
            ))
          : keyword && (
              <EmptyState text={`'${keyword}'로 검색된 결과가 없어요.`} />
            )}
      </div>

      {/* 로딩 스피너 */}
      {isLoading && (
        <div className="flex justify-center items-center h-20">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AllArticlesSection;
