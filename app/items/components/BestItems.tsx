"use client";

import ItemContent from "./ItemContent";
import { ItemType } from "../types/Items";
import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getBestItems } from "../actions/bestItems";
import { HiArrowPath } from "react-icons/hi2";

const BestItems = () => {
  const pageSize = useCalculateWidth("best");
  const [bestItems, setBestItems] = useState<ItemType["list"]>([]);
  const [isPending, setIsPending] = useState(false);

  const getItems = useCallback(async () => {
    try {
      setIsPending(true);
      const response = await getBestItems(pageSize);

      if (response && response.list) {
        setBestItems(response.list);
      }
    } catch (error) {
      console.error("베스트 상품 조회 실패", error);
      toast.error("베스트 상품 조회 실패");
    } finally {
      setIsPending(false);
    }
  }, [pageSize]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  if (isPending) {
    return (
      <div className="text-center font-bold text-xl flex items-center justify-center space-x-2">
        <HiArrowPath className="animate-spin" />
        베스트상품 목록을 가져오고 있습니다.
      </div>
    );
  }

  return (
    <section>
      <h2 className="font-bold text-xl">베스트 상품</h2>
      <div className="pt-6 grid grid-cols-1 space-y-4 md:grid-cols-2 md:space-x-4 md:space-y-0 lg:grid-cols-3">
        <ItemContent itemList={bestItems} imgSize={343} kind="best" />
      </div>
    </section>
  );
};

export default BestItems;
