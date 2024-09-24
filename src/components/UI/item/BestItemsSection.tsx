import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "@/api/itemApi";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import {
  Product,
  ProductListResponse,
  ProductSortOption,
} from "@/types/product";

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchSortedData = async ({
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
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy: "favorite", pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <div className="py-4 mt-6 md:py-6 md:mt-12 lg:py-8 lg:mt-12">
        <h1 className="text-gray-900 font-bold text-xl mb-4">베스트 상품</h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {itemList?.map((item) => (
            <ItemCard
              item={item}
              key={`best-item-${item.id}`}
              width={width}
              height={height}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BestItemsSection;
