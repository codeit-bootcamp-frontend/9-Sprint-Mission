"use client";

import ItemSearch from "./ItemSearch";
import Image from "next/image";
import SelectMenu from "@/components/ui/SelectMenu";
import ItemContent from "./ItemContent";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { ChangeEvent, useState, useEffect, useCallback } from "react";
import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import { ItemType } from "../types/Items";
import { HiArrowPath } from "react-icons/hi2";
import toast from "react-hot-toast";
import { getAllItems } from "../actions/allItems";

const AllItems = () => {
  const pageSize = useCalculateWidth("all");
  const isMobile = pageSize === 4;

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [orderBy, setOrderBy] = useState("recent");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchPost, setSearchPost] = useState<ItemType["list"]>([]);
  const [allItems, setAllItems] = useState<ItemType["list"]>([]);
  const [isPending, setIsPending] = useState(false);

  const getItems = useCallback(async () => {
    try {
      setIsPending(true);
      const response = await getAllItems(pageSize, orderBy, page);

      if (response && response.list) {
        setAllItems(response.list);
        setTotalPage(Math.ceil(response.totalCount / pageSize));
      }
    } catch (error) {
      console.error("전체 상품 조회 실패", error);
      toast.error("전체 상품 조회 실패");
    } finally {
      setIsPending(false);
    }
  }, [pageSize, orderBy, page]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleOpenMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleSelectOrderBy = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setOrderBy(value);
  };

  if (isPending) {
    return (
      <p className="flex items-center justify-center space-x-2 font-bold text-xl mt-20">
        <HiArrowPath className="animate-spin" />
        전체 상품 목록을 가져오고 있습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">전체 상품</h2>
          <Link
            href="/additem"
            className="px-6 py-3 rounded-lg bg-panda-theme text-panda-gray100 font-semibold"
          >
            상품 등록하기
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <ItemSearch
            setSearchPost={setSearchPost}
            setTotalPage={setTotalPage}
            pageSize={pageSize}
          />
          <button
            type="button"
            className="w-[42px] h-[42px] rounded-xl border-[1px] border-panda-gray200 flex items-center justify-center p-2 md:hidden"
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
      
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {allItems && (
            <ItemContent
              itemList={searchPost.length > 0 ? searchPost : allItems}
              imgSize={168}
              kind="all"
            />
          )}
        </div>
    
      <Pagination page={page} totalPage={totalPage} setPage={setPage} isMobile={isMobile} />
    </div>
  );
};

export default AllItems;
