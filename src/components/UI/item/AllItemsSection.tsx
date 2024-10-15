// src/components/UI/item/AllItemsSection.tsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/api/products/getProducts";
import ItemCard from "./ItemCard";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import PaginationBar from "@/components/UI/PaginationBar";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import {
  Product,
  ProductListResponse,
  ProductSortOption,
} from "@/types/product";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/router";

// 화면 크기에 따라 페이지당 아이템 수를 계산하는 함수
const getPageSize = (width: number) => {
  if (width < 768) return 4; // 모바일
  if (width < 1280) return 6; // 태블릿
  return 10; // 데스크탑
};

interface AllItemsSectionProps {
  width: number;
  height: number;
}

const AllItemsSection = ({ width, height }: AllItemsSectionProps) => {
  const [orderBy, setOrderBy] = useState<ProductSortOption>("recent");
  const [page, setPage] = useState(1);
  const [itemList, setItemList] = useState<Product[]>([]);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth)); // 초기값을 window.innerWidth 사용

  // 화면 리사이즈 시 페이지 크기 결정 및 페이지를 초기화
  useEffect(() => {
    const handleResize = () => {
      const newPageSize = getPageSize(window.innerWidth);
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
        setPage(1); // 페이지를 1로 초기화
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pageSize]);

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
      const response: ProductListResponse = await getProducts({
        orderBy,
        page,
        pageSize,
        keyword: debouncedSearchKeyword.trim()
          ? debouncedSearchKeyword
          : undefined,
      });

      // 새로 받은 리스트로 상태 업데이트
      setItemList(response.list);

      // 총 페이지 수 업데이트
      setTotalPageNum(Math.ceil(response.totalCount / pageSize));
    } catch (error) {
      console.error("상품을 불러오는 데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, page, pageSize, debouncedSearchKeyword]);

  // 상품을 불러오는 useEffect
  useEffect(() => {
    fetchSortedData();
  }, [fetchSortedData]);

  // 정렬 옵션 선택 핸들러
  const handleSortSelection = (sortOption: ProductSortOption) => {
    if (sortOption !== orderBy) {
      setOrderBy(sortOption);
      setPage(1);
    }
  };

  // 검색어 입력 핸들러
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setPage(1);
  };

  return (
    <div className="mt-6 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center">
        <div className="mb-6 text-2xl font-bold text-gray-800">
          판매 중인 상품
        </div>
        <Link href="/addItem">
          <Image
            src="/images/ui/register_small_40.png"
            alt="상품 등록하기"
            width={133}
            height={42}
          />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar onSearch={handleSearch} className="w-full md:w-96" />
        <DropdownMenu<ProductSortOption>
          onSortSelection={handleSortSelection}
          type="product"
        />
      </div>

      {isLoading && itemList.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      ) : (
        <div className="space-y-6">
          {itemList.length > 0 ? (
            <div className="grid grid-cols-2 gap-8 sm:gap-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {itemList.map((item) => (
                <ItemCard
                  item={item}
                  key={`market-item-${item.id}`}
                  width={width}
                  height={height}
                />
              ))}
            </div>
          ) : !isLoading && debouncedSearchKeyword ? (
            <div>
              <span>검색된 결과가 없습니다.</span>
            </div>
          ) : null}
        </div>
      )}

      {isLoading && itemList.length > 0 && (
        <div className="flex justify-center items-center h-20">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      )}

      {totalPageNum > 1 && (
        <div className="pt-10 pb-20">
          <PaginationBar
            totalPageNum={totalPageNum}
            activePageNum={page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default AllItemsSection;
