// src/components/UI/item/BestItemsSection.tsx
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import useDebounce from "@/hooks/useDebounce";
import { useProduct } from "@/hooks/useProduct";
import { ProductSortOption } from "@/constants/ProductSortOption";

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
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);
  const debouncedWindowWidth = useDebounce(windowWidth, 300);
  const pageSize = getPageSize(debouncedWindowWidth);

  const { useProducts } = useProduct();
  const { data, isLoading } = useProducts({
    page: 1,
    pageSize,
    orderBy: ProductSortOption.FAVORITE,
    enabled: true,
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
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
        {data?.list?.map((item) => (
          <ItemCard key={`best-item-${item.id}`} item={item} width={width} height={height} priority={true} />
        ))}
      </div>
    </div>
  );
};

export default BestItemsSection;
