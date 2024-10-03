// src/components/UI/item/AllItemsSection.tsx
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/api/product";
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
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";
import useDebounce from "@/hooks/useDebounce"; // 디바운스 훅 추가

// public 폴더 경로 문자열로 대체
const RegisterButtonImage = "/images/ui/register_small_40.png";

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
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [keyword, setKeyword] = useState("");

  // 창 너비 상태 관리
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // 디바운스된 창 너비
  const debouncedWindowWidth = useDebounce(windowWidth, 300); // 300ms 지연

  // 페이지당 아이템 수
  const [pageSize, setPageSize] = useState(getPageSize(debouncedWindowWidth));

  const fetchSortedData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response: ProductListResponse = await getProducts({
        orderBy,
        page,
        pageSize,
        keyword,
      });
      setItemList(response.list);
      setTotalPageNum(Math.ceil(response.totalCount / pageSize));
    } catch (error) {
      console.error("오류: ", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, page, pageSize, keyword, setIsLoading]);

  // 창 크기 변경 시 windowWidth 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // 창 너비 업데이트
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 디바운스된 창 너비에 따라 pageSize 결정
  useEffect(() => {
    setPageSize(getPageSize(debouncedWindowWidth)); // 디바운스된 창 너비로 pageSize 설정
  }, [debouncedWindowWidth]);

  // 데이터 요청
  useEffect(() => {
    fetchSortedData(); // 데이터 불러오기
  }, [fetchSortedData]);

  const handleSortSelection = (sortOption: ProductSortOption) => {
    setOrderBy(sortOption);
    setPage(1);
  };

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setPage(1);
  };

  return (
    <div className="mt-6 max-w-[1200px] mx-auto">
      {/* 타이틀 및 상품 등록 버튼 */}
      <div className="flex justify-between items-center">
        <div className="mb-6 text-2xl font-bold text-gray-800">
          판매 중인 상품
        </div>
        <Link href="/addItem">
          <Image
            src={RegisterButtonImage}
            alt="상품 등록하기"
            width={133}
            height={42}
          />
        </Link>
      </div>

      {/* 검색 및 정렬 옵션 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar onSearch={handleSearch} className="w-full md:w-96" />
        <DropdownMenu<ProductSortOption>
          onSortSelection={(sortOption) => handleSortSelection(sortOption)}
          type="product"
        />
      </div>

      {/* 로딩 중 */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* 상품 목록 */}
          {itemList.length ? (
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
          ) : (
            keyword && (
              <div>
                <span>검색된 결과가 없습니다.</span>
              </div>
            )
          )}
        </div>
      )}

      {/* 페이지네이션 */}
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
