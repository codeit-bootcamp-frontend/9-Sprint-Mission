"use client";

import ItemSearch from "./ItemSearch";
import Image from "next/image";
import SelectMenu from "@/components/ui/SelectMenu";
import ItemContent from "./ItemContent";
import Pagination from "@/components/Pagination";
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useState, useEffect } from "react";
import { useCalculateWidth } from "@/hooks/useCalculateWidth";
import { instance } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ItemType } from "../types/Items";
import { HiArrowPath } from "react-icons/hi2";

const getAllItems = async (pageSize: number, orderBy: string, page: number) => {
  if (pageSize === 0) return { list: [], totalCount: 0 };

  try {
    const response = await instance.get(
      `/products?pageSize=${pageSize}&orderBy=${orderBy}&page=${page}`
    );

    if (response.status === 200) {
      const { list, totalCount } = response.data;
      return { list, totalCount };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("전체 상품 조회 실패", error.response?.data);
      throw new Error(error.response?.data.message);
    }
  }

  return { list: [], totalCount: 0 };
};

const AllItems = () => {
  const pageSize = useCalculateWidth("all");
  const isMobile = pageSize === 4;
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [orderBy, setOrderBy] = useState("recent");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchPost, setSearchPost] = useState<ItemType["list"]>([]);
  const {
    data: allItems,
    isPending,
    error,
  } = useQuery<{ list: ItemType["list"]; totalCount: ItemType["totalCount"] }, Error>({
    queryKey: ["allItems", page, orderBy],
    queryFn: () => getAllItems(pageSize, orderBy, page),
    initialData: { list: [], totalCount: 0 },
    enabled: pageSize > 0,
  });

  useEffect(() => {
    if (pageSize > 0) {
      queryClient.prefetchQuery({
        queryKey: ["allItems", page, orderBy],
        queryFn: () => getAllItems(pageSize, orderBy, page),
      });
    }
  }, [queryClient, page, orderBy, pageSize]);

  useEffect(() => {
    if (allItems) {
      if (pageSize > 0) {
        setTotalPage(Math.ceil(allItems.totalCount / pageSize));
      }
    }
  }, [allItems, pageSize]);

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
      {isPending ? (
        <p className={`text-center font-bold text-xl ${error ? "text-red" : ""}`}>
          {error ? error?.message : "전체 상품 목록을 가져오고 있습니다."}
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {allItems && (
            <ItemContent
              itemList={searchPost.length > 0 ? searchPost : allItems.list}
              imgSize={168}
              kind="all"
            />
          )}
        </div>
      )}
      <Pagination page={page} totalPage={totalPage} setPage={setPage} isMobile={isMobile} />
    </div>
  );
};

export default AllItems;
