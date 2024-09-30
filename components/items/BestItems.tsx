import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import { cls } from "@/lib/utils";
import { IItemList } from "@/types/itemsTypeShare";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const BestItems = () => {
  const pageSize: number = useCalculateWidth("best");

  const [bestItems, setBestItems] = useState<IItemList['list']>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const getBestItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/items/bestItems?pageSize=${pageSize}&orderBy=favorite`
      );

      if (response.status === 200) {
        setBestItems(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("중고마켓 베스트상품 getBestItems에서 api 오류 발생", error);
        setError(error.response?.data);
      } else {
        console.error("중고마켓 베스트상품 getBestItems에서 알 수 없는 오류 발생", error);
        setError("오류가 발생하여 베스트상품을 불러오지 못했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    getBestItems();
  }, [getBestItems]);

  return (
    <>
      <h2 className="font-bold text-xl">베스트 상품</h2>
      {!isLoading ? (
        <div className="grid grid-cols-1 space-y-4 md:grid-cols-2 md:space-x-4 md:space-y-0 lg:grid-cols-3">
          {bestItems.map((item) => (
            <div key={item.id} className="flex flex-col space-y-4">
              <Image
                src={item.images[0] || "/icons/question.png"}
                alt="베스트제품"
                width={343}
                height={343}
                className="rounded-2xl w-full h-[343px] object-cover"
              />
              <div className="flex flex-col space-y-2">
                <h2 className="text-sm font-medium">{item.name}</h2>
                <span className="font-bold">{item.price.toLocaleString("ko-KR")}원</span>
                <div className="flex items-center space-x-1">
                  <Image src="/icons/ic_heart.svg" alt="좋아요" width={13} height={13} />
                  <span className="text-xs font-medium text-[#4B5563]">{item.favoriteCount}</span>
                </div>
              </div>
            </div>
          ))}
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
