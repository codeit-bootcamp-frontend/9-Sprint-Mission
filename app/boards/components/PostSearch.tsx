"use client";

import { searchSchema } from "@/components/zodSchema/SearchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { searchPost } from "../actions/searchPost";
import { boardsAtom } from "@/atom/boardsAtom";
import { useSetAtom } from "jotai";
import { toast } from "react-hot-toast";

const PostSearch = () => {
  const {
    register,
    handleSubmit,
  } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    mode: "onSubmit",
    defaultValues: {
      userSearch: "",
    },
  });
  const setBoards = useSetAtom(boardsAtom);

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    try {
      const formData = new FormData();
      formData.append("userSearch", values.userSearch || "");

      const response = await searchPost(formData);

      if (response) { 
        setBoards(response.list);
      }
    } catch (error) {
      console.error("게시글 조회 실패", error);
      toast.error("게시글 조회 실패");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <form className="flex items-center justify-between w-full" action={searchPost} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-3 bg-panda-gray100 px-5 py-3 rounded-xl w-[288px] md:w-[560px] lg:w-[1054px]">
          <Image src="/icons/search.png" alt="검색" width={15} height={15} />
          <input
            {...register("userSearch")}
            type="text"
            id="userSearch"
            name="userSearch"
            className="w-full bg-transparent focus:outline-none"
            placeholder="검색할 게시글을 입력해주세요"
          />
        </div>
        <button type="submit" className="hidden">
          제출
        </button>
        <button
          type="button"
          className="w-[42px] h-[42px] rounded-xl border-[1px] border-panda-gray200 flex items-center justify-center p-2 md:hidden"
        >
          <Image src="/icons/orderBtn.png" alt="검색" width={24} height={24} />
        </button>
      </form>
      <select className="custom-select">
        <option value="recent">최신순</option>
        <option value="like">좋아요순</option>
      </select>
    </div>
  );
};

export default PostSearch;
