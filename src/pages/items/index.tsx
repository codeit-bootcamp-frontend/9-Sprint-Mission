// src/pages/items/index.tsx
import React, { useEffect, useState } from "react";
import "../../styles/common.module.css";
import BestItemsSection from "@/components/UI/item/BestItemsSection";
import AllItemsSection from "@/components/UI/item/AllItemsSection";
import { useProduct } from "@/hooks/useProduct";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

export default function MarketPage() {
  const [isClient, setIsClient] = useState(false);
  const { useProducts } = useProduct();

  // 기본 상품 목록 조회
  const { data: products, isLoading } = useProducts({
    page: 1,
    pageSize: 10,
    orderBy: "latest",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpinner isLoading={true} />;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <BestItemsSection width={282} height={282} />
      <AllItemsSection
        width={220}
        height={220}
        products={products?.products || []}
        totalPages={products?.totalPages || 1}
      />
    </div>
  );
}
