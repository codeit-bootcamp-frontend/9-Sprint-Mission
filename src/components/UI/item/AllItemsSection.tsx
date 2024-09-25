// src/components/UI/item/AllItemsSection.tsx
import React, { useEffect, useState } from "react";
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
import Link from "next/link";

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
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0); // 이미지 로딩 추적

  const fetchSortedData = async ({
    orderBy,
    page,
    pageSize,
  }: {
    orderBy: ProductSortOption;
    page: number;
    pageSize: number;
  }) => {
    setIsLoading(true);
    try {
      const response: ProductListResponse = await getProducts({
        orderBy,
        page,
        pageSize,
      });
      setItemList(response.list);
      setTotalPageNum(Math.ceil(response.totalCount / pageSize));
    } catch (error) {
      console.error("오류: ", (error as Error).message);
    }
  };

  const handleSortSelection = (sortOption: ProductSortOption) => {
    setOrderBy(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize]);

  // 이미지 로드 완료 시 호출되는 함수
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    // 모든 이미지가 로드되면 로딩 상태를 false로 전환
    if (imagesLoaded === itemList.length && itemList.length > 0) {
      setIsLoading(false);
    }
  }, [imagesLoaded, itemList.length]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      {/* 로딩 스피너는 이미지 로드가 완료될 때까지 표시 */}
      <LoadingSpinner isLoading={isLoading} />

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
            onSortSelection={(sortOption) => handleSortSelection(sortOption)}
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
