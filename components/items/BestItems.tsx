import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import { instance } from "@/lib/axios";
import { cls } from "@/lib/utils";
import { IItemList } from "@/types/itemsTypeShare";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ItemsContents from "./ItemsContents";

const BestItems = () => {
  const pageSize: number = useCalculateWidth("best");

  const [bestItems, setBestItems] = useState<IItemList["list"]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getBestItems = useCallback(async () => {
    if (pageSize === 0 || pageSize === Infinity) return null;

    try {
      setLoading(true);
      const response = await instance.get(`/products?pageSize=${pageSize}&orderBy=favorite`);

      if (response.status === 200) {
        setBestItems(response.data.list);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("중고마켓 베스트상품 getBestItems에서 api 오류 발생", error);
        setError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    getBestItems();
  }, [getBestItems, pageSize]);

  return (
    <>
      <h2 className="font-bold text-xl">베스트 상품</h2>
      {!isLoading ? (
        <div className="grid grid-cols-1 space-y-4 md:grid-cols-2 md:space-x-4 md:space-y-0 lg:grid-cols-3">
          <ItemsContents itemList={bestItems} imgSize={343} kind={"best"} />
        </div>
      ) : (
        <p className={cls("text-center font-bold text-xl", error !== "" ? "text-red-500" : "")}>
          {error === "" ? "베스트상품 목록을 가져오고 있습니다." : error}
        </p>
      )}
    </>
  );
};

export default BestItems;
