// src/components/UI/item/AllItemsSection.tsx
import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import PaginationBar from "@/components/UI/PaginationBar";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { ProductSortOption } from "@/constants/ProductSortOption";
import { useProduct } from "@/hooks/useProduct";
import useDebounce from "@/hooks/useDebounce";

// 화면 크기에 따른 pageSize 결정 함수
const getPageSize = (width: number) => {
  if (width < 768) {
    return 4; // 모바일 화면
  } else if (width < 1280) {
    return 6; // 태블릿 화면
  } else {
    return 10; // 데스크탑 화면
  }
};

interface AllItemsSectionProps {
  width: number;
  height: number;
}

export default function AllItemsSection({ width, height }: AllItemsSectionProps) {
  const { useProducts } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<ProductSortOption>(ProductSortOption.RECENT);
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedKeyword = useDebounce(searchKeyword, 500);

  // 창 너비 상태 관리 추가
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);
  const debouncedWindowWidth = useDebounce(windowWidth, 300);
  const pageSize = getPageSize(debouncedWindowWidth);

  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading } = useProducts({
    page: currentPage,
    pageSize, // 동적 pageSize 적용
    orderBy: sortOption,
    keyword: debouncedKeyword,
    enabled: true,
  });

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (option: ProductSortOption) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  // 검색어 변경 핸들러
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <LoadingSpinner isLoading={true} />;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">전체 상품</h2>

        <div className="flex items-center gap-4">
          {/* 검색바 */}
          <div className="w-80">
            <SearchBar onSearch={handleSearch} placeholder="상품명을 검색해주세요" />
          </div>

          {/* 정렬 옵션 */}
          <div className="w-48">
            <DropdownMenu onSortSelection={(value) => handleSortChange(value as ProductSortOption)} type="product" />
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      {!data?.list?.length ? (
        <div className="text-center py-12 text-gray-500">검색 결과가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data.list.map((product) => (
            <ItemCard key={product.id} item={product} width={width} height={height} priority={currentPage === 1} />
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {data?.totalCount && (
        <div className="mt-8 flex justify-center">
          <PaginationBar
            activePageNum={currentPage}
            totalPageNum={data?.totalCount || 1}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}
