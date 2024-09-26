// src/components/UI/item/BestItemsSection.tsx
import React, { useEffect, useState, useCallback } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "@/api/item";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import {
  Product,
  ProductListResponse,
  ProductSortOption,
} from "@/types/product";
import { useAtom } from "jotai";
import { loadingAtom } from "@/store/loadingAtom";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1280) {
    return 2;
  } else {
    return 4;
  }
};

interface BestItemsSectionProps {
  width: number;
  height: number;
}

const BestItemsSection = ({ width, height }: BestItemsSectionProps) => {
  const [itemList, setItemList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const fetchSortedData = useCallback(
    async ({
      orderBy,
      pageSize,
    }: {
      orderBy: ProductSortOption;
      pageSize: number;
    }) => {
      setIsLoading(true);
      try {
        const response: ProductListResponse = await getProducts({
          orderBy,
          pageSize,
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

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    fetchSortedData({ orderBy: "favorite", pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize, fetchSortedData]);

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
      <div className="py-4 mt-6 md:py-6 md:mt-12 lg:py-8 lg:mt-12">
        <div className="text-gray-900 font-bold text-xl mb-4">베스트 상품</div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {itemList?.map((item) => (
            <ItemCard
              item={item}
              key={`best-item-${item.id}`}
              width={width}
              height={height}
              onLoad={handleImageLoad} // 이미지 로드 이벤트 핸들러 추가
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BestItemsSection;
