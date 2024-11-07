// src/components/UI/item/BestItemsSection.tsx
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Product } from "@/types/product";
import useDebounce from "@/hooks/useDebounce";
import { useProduct } from "@/hooks/useProduct";

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
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const { useProducts } = useProduct();

  // 창 너비 상태 관리
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  // 디바운스된 창 너비
  const debouncedWindowWidth = useDebounce(windowWidth, 300); // 300ms 지연

  // pageSize를 디바운스된 창 너비로 결정
  const pageSize = getPageSize(debouncedWindowWidth);

  // React Query를 사용한 베스트 상품 데이터 조회
  const { data, isLoading } = useProducts({
    page: 1,
    pageSize,
    orderBy: "favorite",
  });

  // 창 크기 변경 시 windowWidth 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 로딩 시에도 windowWidth 설정

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 이미지 로드 완료 처리
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const isAllImagesLoaded = data?.list && imagesLoaded === data.list.length;

  if (isLoading || !isAllImagesLoaded) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner isLoading={true} />
      </div>
    );
  }

  return (
    <div className="py-4 mt-14 md:py-6 md:mt-16 lg:py-8 lg:mt-16 max-w-[1200px] mx-auto">
      <div className="mb-6 text-2xl font-bold text-gray-800">베스트 상품</div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {data?.list?.map((item: Product) => (
          <ItemCard item={item} key={`best-item-${item.id}`} width={width} height={height} onLoad={handleImageLoad} />
        ))}
      </div>
    </div>
  );
};

export default BestItemsSection;
