// src/components/UI/item/AllItemsSection.tsx
import React, { useState } from "react";
import ItemCard from "./ItemCard";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import PaginationBar from "@/components/UI/PaginationBar";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { ProductSortOption } from "@/constants/ProductSortOption";
import { useProduct } from "@/hooks/useProduct";
import useDebounce from "@/hooks/useDebounce";

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

  const { data, isLoading } = useProducts({
    page: currentPage,
    pageSize: 10,
    orderBy: sortOption,
    keyword: debouncedKeyword,
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">전체 상품</h2>

        {/* 검색 및 정렬 옵션 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          {/* 검색바 */}
          <div className="w-full sm:w-96">
            <SearchBar onSearch={handleSearch} placeholder="상품명을 검색해주세요" />
          </div>

          {/* 정렬 옵션 */}
          <div className="w-48">
            <DropdownMenu onSortSelection={(value) => handleSortChange(value as ProductSortOption)} type="product" />
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      {data?.list.length === 0 ? (
        <div className="text-center py-12 text-gray-500">검색 결과가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.list.map((product) => (
            <ItemCard key={product.id} item={product} width={width} height={height} />
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
