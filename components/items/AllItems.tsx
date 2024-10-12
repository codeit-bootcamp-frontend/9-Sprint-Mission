import Link from "next/link";
import ItemSearchForm from "./ItemSearchForm";
import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IItemList } from "@/types/itemsTypeShare";
import axios from "axios";
import { cls } from "@/lib/utils";
import Pagination from "../Pagination";
import { instance } from "@/lib/axios";
import ItemsContents from "./ItemsContents";
import SelectMenu from "../SelectMenu";

const AllItems = () => {
  const pageSize = useCalculateWidth("all");
  const isMobile = pageSize === 4;

  const [allItems, setAllItems] = useState<IItemList["list"]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [orderBy, setOrderBy] = useState("recent");
  const [searchPost, setSearchPost] = useState<IItemList["list"]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectOrderBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setOrderBy(value);
  };

  const getAllItems = useCallback(async () => {
    if (pageSize === 0 || pageSize === Infinity) return null;

    try {
      setLoading(true);
      const response = await instance.get(
        `/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`
      );

      if (response.status === 200) {
        setAllItems(response.data.list);
        setTotalPage(Math.ceil(response.data.totalCount / pageSize));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("중고마켓 전체상품 getAllItems에서 api 오류 발생", error);
        setError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, orderBy]);

  const handleOpenMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">전체 상품</h2>
          <Link
            href="/additem"
            className="px-6 py-3 rounded-lg bg-[--color-theme] text-[--color-gray100] font-semibold"
          >
            상품 등록하기
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <ItemSearchForm setSearchPost={setSearchPost} setTotalPage={setTotalPage} pageSize={pageSize} />
          <button
            type="button"
            className="w-[42px] h-[42px] rounded-xl border-[1px] border-[--color-gray200] flex items-center justify-center p-2 md:hidden"
            onClick={handleOpenMenu}
          >
            <Image src="/icons/orderBtn.png" alt="검색" width={24} height={24} />
          </button>
          <div className="relative -ml-14">
            {menuOpen && <SelectMenu setOrderBy={setOrderBy} />}
            <select className="custom-select" onChange={handleSelectOrderBy}>
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>
      </div>
      {!isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <ItemsContents
            itemList={searchPost.length > 0 ? searchPost : allItems}
            imgSize={168}
            kind={searchPost.length > 0 ? "search" : "all"}
          />
        </div>
      ) : (
        <p className={cls("text-center font-bold text-xl", error !== "" ? "text-red-500" : "")}>
          {error === "" ? "전체상품 목록을 가져오고 있습니다." : error}
        </p>
      )}
      <Pagination totalPage={totalPage} page={page} setPage={setPage} isMobile={isMobile} />
    </div>
  );
};

export default AllItems;
