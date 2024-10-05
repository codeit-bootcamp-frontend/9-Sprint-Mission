// src/components/UI/item/AllItemsSection.tsx
import React, { useEffect, useState } from "react";
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

  // 초기 렌더링 시 데이터를 불러오지 않게 하기 위해 클라이언트 사이드에서만 동작하도록 설정
  const [pageSize, setPageSize] = useState<number | null>(null); // null일 때는 로딩 대기

  // 화면 리사이즈 시 페이지 크기 결정 (클라이언트 사이드에서만 실행)
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setPageSize(getPageSize(window.innerWidth)); // 화면 크기에 맞는 pageSize 설정
      }
    };

    // 처음 렌더링 시 실행
    handleResize();

    // 이후 창 크기 변경 시 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 디바운스된 검색어로 라우터 쿼리 업데이트 및 아이템 목록 초기화
  useEffect(() => {
    const query = { ...router.query };

    if (debouncedSearchKeyword.trim()) {
      query.q = debouncedSearchKeyword;
    } else {
      delete query.q;
    }

    if (router.query.q !== debouncedSearchKeyword.trim()) {
      router.replace(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    }
    setPage(1);
    setItemList([]);
  }, [debouncedSearchKeyword, router.pathname]);

  // 상품을 불러오는 비동기 함수
  useEffect(() => {
    if (pageSize === null) {
      // pageSize가 아직 설정되지 않았을 때는 아무 것도 하지 않음
      return;
    }

    const fetchSortedData = async () => {
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
        setItemList(response.list);
        setTotalPageNum(Math.ceil(response.totalCount / pageSize));
      } catch (error) {
        console.error("상품을 불러오는 데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // 클라이언트에서 pageSize가 설정된 후 데이터를 불러옴
    fetchSortedData();
  }, [orderBy, page, pageSize, debouncedSearchKeyword]);

  // 정렬 옵션 선택 핸들러
  const handleSortSelection = (sortOption: ProductSortOption) => {
    if (sortOption !== orderBy) {
      setOrderBy(sortOption);
      setPage(1);
      setItemList([]); // 아이템 리스트 초기화
    }
  };

  // 검색어 입력 핸들러
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setPage(1);
    setItemList([]); // 아이템 리스트 초기화
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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      ) : (
        <div className="space-y-6">
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
          ) : debouncedSearchKeyword ? (
            <div>
              <span>검색된 결과가 없습니다.</span>
            </div>
          ) : null}
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
