// src/components/UI/item/BestItemsSection.tsx
import React, { useEffect, useState, useCallback } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "@/api/products/getProducts";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import {
  Product,
  ProductListResponse,
  ProductSortOption,
} from "@/types/product";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";
import useDebounce from "@/hooks/useDebounce"; // 디바운스 훅 가져오기

// 화면 크기에 따른 pageSize 결정 함수
const getPageSize = (width: number) => {
  if (width < 768) {
    return 1; // 모바일 화면
  } else if (width < 1280) {
    return 2; // 태블릿 화면
  } else {
    return 4; // 데스크탑 화면
  }
};

interface BestItemsSectionProps {
  width: number;
  height: number;
}

const BestItemsSection = ({ width, height }: BestItemsSectionProps) => {
  const [itemList, setItemList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // 창 너비 상태 관리
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // 디바운스된 창 너비
  const debouncedWindowWidth = useDebounce(windowWidth, 300); // 300ms 지연

  // pageSize를 디바운스된 창 너비로 결정
  const pageSize = getPageSize(debouncedWindowWidth);

  // 베스트 상품 데이터를 가져오는 함수
  const fetchSortedData = useCallback(
    async ({
      pageSize,
      orderBy,
    }: {
      pageSize: number;
      orderBy: ProductSortOption;
    }) => {
      setIsLoading(true);
      try {
        const response: ProductListResponse = await getProducts({
          page: 1,
          pageSize,
          orderBy,
        });
        setItemList(response.list);
      } catch (error) {
        console.error("오류: ", (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  // 창 크기 변경 시 windowWidth 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 초기 로딩 시에도 windowWidth 설정
    handleResize();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // debouncedWindowWidth가 변경될 때마다 fetchSortedData 호출
  useEffect(() => {
    fetchSortedData({ orderBy: "favorite", pageSize });
  }, [debouncedWindowWidth, fetchSortedData, pageSize]);

  useEffect(() => {
    if (imagesLoaded === itemList.length && itemList.length > 0) {
      setIsLoading(false);
    }
  }, [imagesLoaded, itemList.length, setIsLoading]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner isLoading={isLoading} />
        </div>
      )}
      <div className="py-4 mt-14 md:py-6 md:mt-16 lg:py-8 lg:mt-16 max-w-[1200px] mx-auto">
        {" "}
        {/* max-w-[1200px] 추가 */}
        <div className="mb-6 text-2xl font-bold text-gray-800">베스트 상품</div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {itemList?.map((item) => (
            <ItemCard
              item={item}
              key={`best-item-${item.id}`}
              width={width}
              height={height}
              onLoad={handleImageLoad}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BestItemsSection;
