import axios from "axios";
import ItemContent from "./ItemContent";
import { ItemType } from "../types/Items";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/lib/axios";
import { useCalculateWidth } from "@/hooks/useCalculateWidth";

const getBestItems = async (pageSize: number) => {
  if (pageSize === 0) return [];

  try {
    const response = await instance.get(`/products?pageSize=${pageSize}&orderBy=favorite`);

    if (response.status === 200) {
      return response.data.list;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("베스트 상품 조회 실패", error.response?.data);
      throw new Error(error.response?.data.message);
    }
  }

  return [];
};

const BestItems = () => {
  const pageSize = useCalculateWidth("best");

  const {
    data: bestItems,
    isPending,
    isError,
  } = useQuery<ItemType["list"], Error>({
    queryKey: ["bestItems"],
    queryFn: () => getBestItems(pageSize),
    initialData: [],
    enabled: pageSize > 0,
  });

  if (isError) {
    return <div className="text-center font-bold text-xl">상품 조회 실패</div>;
  }

  return (
    <section>
      <h2 className="font-bold text-xl">베스트 상품</h2>
      {!isPending ? (
        <div className="pt-6 grid grid-cols-1 space-y-4 md:grid-cols-2 md:space-x-4 md:space-y-0 lg:grid-cols-3">
          <ItemContent itemList={bestItems} imgSize={343} kind="best" />
        </div>
      ) : (
        <div className="text-center font-bold text-xl">베스트상품 목록을 가져오고 있습니다.</div>
      )}
    </section>
  );
};

export default BestItems;
