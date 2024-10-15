import { searchSchema } from "@/app/boards/searchConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import PostList from "./PostList";
import { ISearchList } from "@/types/boardsTypeShare";
import SelectMenu from "../SelectMenu";
import { instance } from "@/lib/axios";

// 검색 form 컴포넌트
const SearchForm = () => {
  const [searchList, setSearchList] = useState<ISearchList[]>([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [menuOpen, setMenuOpen] = useState(false);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      userSearch: "",
    },
  });

  const isLoading = form.formState.isLoading;
  const error = form.formState.errors;

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setOrderBy(value);
  };

  const handleSubmit = async (values: z.infer<typeof searchSchema>) => {
    try {
      const response = await instance.get(`/articles?keyword=${values.userSearch}`);

      if (response.status === 200) {
        form.reset();
        setSearchList(response.data.list);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("검색 handleSubmit에서 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleOpenMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (typeof error.userSearch?.message === "string") {
      toast.error(error.userSearch.message);
    }
  }, [error]);

  return (
    <>
      <div className="flex items-center justify-between">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center space-x-3 bg-[--color-gray100] px-5 py-3 rounded-xl w-[288px] md:w-[560px] lg:w-[1054px]">
            <Image src="/icons/search.png" alt="검색" width={15} height={15} />
            <input
              {...form.register("userSearch")}
              type="text"
              id="userSearch"
              name="userSearch"
              className="w-full bg-transparent focus:outline-none"
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
          <button type="submit" className="hidden" disabled={!form.formState.isValid}>
            제출
          </button>
          <button
            type="button"
            className="w-[42px] h-[42px] rounded-xl border-[1px] border-[--color-gray200] flex items-center justify-center p-2 md:hidden"
            onClick={handleOpenMenu}
          >
            <Image src="/icons/orderBtn.png" alt="검색" width={24} height={24} />
          </button>
        </form>
        <div className="relative">
          {menuOpen && <SelectMenu setOrderBy={setOrderBy} />}
          <select className="custom-select" onChange={handleChangeSelect}>
            <option value="recent">최신순</option>
            <option value="like">좋아요순</option>
          </select>
        </div>
      </div>
      <PostList searchList={searchList} searchLoading={isLoading} orderBy={orderBy} />
    </>
  );
};

export default SearchForm;
