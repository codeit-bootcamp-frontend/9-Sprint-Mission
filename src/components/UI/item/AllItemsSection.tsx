// src/components/UI/item/AllItemsSection.tsx
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getProducts } from "@/api/item";
import ItemCard from "./ItemCard";
import SearchIcon from "@/images/icons/ic_search.svg";
import DropdownMenu from "@/components/UI/DropdownMenu";
import PaginationBar from "@/components/UI/PaginationBar";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import {
  Product,
  ProductListResponse,
  ProductSortOption,
} from "@/types/product";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1280) {
    return 6;
  } else {
    return 10;
  }
};

interface AllItemsSectionProps {
  width: number;
  height: number;
}

const AllItemsSection = ({ width, height }: AllItemsSectionProps) => {
  const [orderBy, setOrderBy] = useState<ProductSortOption>("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [itemList, setItemList] = useState<Product[]>([]);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(true); // 데이터 로딩 상태 관리
  const [isLoadingImages, setIsLoadingImages] = useState(true); // 이미지 로딩 상태 관리
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const fetchSortedData = useCallback(
    async ({
      orderBy,
      page,
      pageSize,
    }: {
      orderBy: ProductSortOption;
      page: number;
      pageSize: number;
    }) => {
      setIsLoadingData(true);
      try {
        const response: ProductListResponse = await getProducts({
          orderBy,
          page,
          pageSize,
        });
        setItemList(response.list);
        setTotalPageNum(Math.ceil(response.totalCount / pageSize));
        setIsLoadingImages(true); // 이미지 로딩 상태 활성화
        setImagesLoaded(0); // 이미지 로드 카운터 초기화
      } catch (error) {
        console.error("오류: ", (error as Error).message);
      } finally {
        setIsLoadingData(false); // 데이터 로딩 완료
      }
    },
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize, fetchSortedData]);

  // 이미지 로드 완료 시 호출되는 함수
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    // 모든 이미지가 로드되면 로딩 상태를 false로 전환
    if (imagesLoaded === itemList.length && itemList.length > 0) {
      setIsLoadingImages(false);
    }
  }, [imagesLoaded, itemList.length]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      {/* 데이터 또는 이미지가 로드되지 않으면 스피너 표시 */}
      {(isLoadingData || isLoadingImages) && (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner isLoading />
        </div>
      )}
      <div>
        <div className="flex justify-between items-center pb-2">
          <div className="text-gray-900 font-bold text-xl">판매 중인 상품</div>
          <Link href="/additem" className="text-blue-500 hover:text-blue-600">
            상품 등록하기
          </Link>
        </div>

        <div className="flex justify-between items-center pb-4">
          <div className="flex bg-gray-100 rounded-xl p-2 flex-1 items-center">
            <SearchIcon />
            <input
              className="border-none flex-1 ml-1 bg-transparent placeholder-gray-400 focus:outline-none text-gray-900"
              placeholder="검색할 상품을 입력해 주세요"
            />
          </div>
          <DropdownMenu<ProductSortOption>
            onSortSelection={(sortOption) => setOrderBy(sortOption)}
            type="product"
          />
        </div>

        <div className="grid grid-cols-2 gap-8 sm:gap-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {itemList?.map((item) => (
            <ItemCard
              item={item}
              key={`market-item-${item.id}`}
              width={width}
              height={height}
              onLoad={handleImageLoad} // 이미지 로드 시 호출
            />
          ))}
        </div>

        <div className="pt-10 pb-20">
          <PaginationBar
            totalPageNum={totalPageNum}
            activePageNum={page}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default AllItemsSection;
