// src/components/UI/item/AllItemsSection.tsx
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/api/item";
import ItemCard from "./ItemCard";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import PaginationBar from "@/components/UI/PaginationBar";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import EmptyState from "@/components/UI/EmptyState";
import {
  Product,
  ProductListResponse,
  ProductSortOption,
} from "@/types/product";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";
import RegisterButtonImage from "@/images/ui/register_small_40.png";

// 화면 크기에 따라 페이지당 아이템 수를 계산하는 함수
const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) return 4; // 모바일
  if (width < 1280) return 6; // 태블릿
  return 10; // 데스크탑
};

interface AllItemsSectionProps {
  width: number;
  height: number;
}

const AllItemsSection = ({ width, height }: AllItemsSectionProps) => {
  // 상품 정렬 옵션 (최신순 or 좋아요순)
  const [orderBy, setOrderBy] = useState<ProductSortOption>("recent");

  // 현재 페이지 번호
  const [page, setPage] = useState(1);

  // 페이지당 아이템 수
  const [pageSize, setPageSize] = useState(10); // 초기값

  // 상품 리스트
  const [itemList, setItemList] = useState<Product[]>([]);

  // 총 페이지 수 계산을 위한 변수
  const [totalPageNum, setTotalPageNum] = useState(1);

  // 로딩 상태 관리를 위한 Jotai Atom 사용
  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  // 검색 키워드
  const [keyword, setKeyword] = useState("");

  // 상품 데이터를 서버에서 가져오는 함수 (정렬, 페이지, 검색 키워드 반영)
  const fetchSortedData = useCallback(async () => {
    setIsLoading(true); // 로딩 상태 시작
    try {
      // API 호출하여 상품 목록 가져오기
      const response: ProductListResponse = await getProducts({
        orderBy,
        page,
        pageSize,
        keyword,
      });
      setItemList(response.list); // 가져온 상품 리스트 상태에 반영
      setTotalPageNum(Math.ceil(response.totalCount / pageSize)); // 전체 페이지 수 계산
    } catch (error) {
      console.error("오류: ", (error as Error).message); // 에러 처리
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  }, [orderBy, page, pageSize, keyword, setIsLoading]);

  // 페이지 사이즈를 화면 크기에 맞게 동적으로 변경
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize()); // 윈도우 크기 변경 시 페이지 사이즈 재설정
    };

    setPageSize(getPageSize()); // 초기 렌더링 시 페이지 사이즈 설정
    window.addEventListener("resize", handleResize); // 윈도우 크기 변경 이벤트 리스너 추가

    fetchSortedData(); // 초기 데이터 로드

    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [fetchSortedData]);

  // 상품 정렬 옵션이 변경될 때 처리하는 함수
  const handleSortSelection = (sortOption: ProductSortOption) => {
    setOrderBy(sortOption); // 정렬 옵션 설정
    setPage(1); // 정렬 변경 시 페이지를 1로 초기화
  };

  // 검색어 입력 시 처리하는 함수
  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword); // 검색 키워드 설정
    setPage(1); // 검색 시 페이지를 1로 초기화
  };

  return (
    <div className="mt-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 섹션 상단: 타이틀과 상품 등록 버튼 */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-gray-800">판매 중인 상품</div>
        <Link href="/addItem">
          <Image
            src={RegisterButtonImage}
            alt="상품 등록하기"
            width={133}
            height={42}
          />
        </Link>
      </div>

      {/* 검색 바 및 정렬 옵션 드롭다운 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar onSearch={handleSearch} className="w-full md:w-96" />
        <DropdownMenu<ProductSortOption>
          onSortSelection={(sortOption) => handleSortSelection(sortOption)} // 정렬 선택 핸들러
          type="product"
        />
      </div>

      {/* 로딩 스피너 처리 */}
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
            // 검색 결과가 없을 때
            keyword && (
              <EmptyState text={`'${keyword}'로 검색된 결과가 없습니다.`} />
            )
          )}
        </div>
      )}

      {/* 페이지네이션 바 */}
      {totalPageNum > 1 && (
        <div className="pt-10 pb-20">
          <PaginationBar
            totalPageNum={totalPageNum} // 총 페이지 수
            activePageNum={page} // 현재 페이지
            onPageChange={setPage} // 페이지 변경 핸들러
          />
        </div>
      )}
    </div>
  );
};

export default AllItemsSection;
