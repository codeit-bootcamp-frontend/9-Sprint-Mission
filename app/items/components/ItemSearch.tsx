import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { ItemType } from "../types/Items";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "@/components/zodSchema/SearchSchema";
import { z } from "zod";
import toast from "react-hot-toast";
import { itemSearch } from "../actions/itemSearch";

interface ItemSearchProps {
  setSearchPost: Dispatch<SetStateAction<ItemType["list"]>>;
  setTotalPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
}

const ItemSearch = ({ setSearchPost, setTotalPage, pageSize }: ItemSearchProps) => {
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

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    try {
      const formData = new FormData();
      formData.append("keyword", values.userSearch || "");

      const response = await itemSearch(formData);

      if (response) {
        setSearchPost(response.list);
        setTotalPage(Math.ceil(response.totalCount / pageSize));
      }
    } catch (error) {
      console.error("상품 조회 실패", error);
      toast.error("상품 조회 실패");
    }
  };

  return (
    <form action={itemSearch} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between relative">
        <div className="flex items-center space-x-3 bg-panda-gray100 px-5 py-3 rounded-xl w-[288px] md:w-[560px] lg:w-[1054px]">
          <Image src="/icons/search.png" alt="검색" width={15} height={15} />
          <input
            {...register("userSearch")}
            type="text"
            name="userSearch"
            className="w-full bg-transparent focus:outline-none"
            placeholder="검색할 상품을 입력해주세요"
          />
        </div>
        <button type="submit" className="hidden">
          제출
        </button>
      </div>
    </form>
  );
};

export default ItemSearch;
