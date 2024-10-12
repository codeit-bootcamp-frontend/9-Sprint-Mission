import { searchSchema } from "@/app/boards/searchConstants";
import { instance } from "@/lib/axios";
import { IList } from "@/types/itemsTypeShare";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface IProps {
  setSearchPost: React.Dispatch<React.SetStateAction<IList[]>>;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
}

const ItemSearchForm = ({ setSearchPost, setTotalPage, pageSize }: IProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    mode: "onSubmit",
    defaultValues: {
      userSearch: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    try {
      const response = await instance.get(`/products?keyword=${values.userSearch}`);

      if (response.status === 200) {
        setSearchPost(response.data.list);
        setTotalPage(Math.ceil(response.data.totalCount / pageSize));
        reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("중고마켓 검색 onSubmit에서 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    }
  }

  useEffect(() => {
    if (typeof errors.userSearch?.message === "string") {
      toast.error(errors.userSearch.message);
    }
  }, [errors]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between relative">
          <div className="flex items-center space-x-3 bg-[--color-gray100] px-5 py-3 rounded-xl w-[288px] md:w-[560px] lg:w-[1054px]">
            <Image src="/icons/search.png" alt="검색" width={15} height={15} />
            <input
              {...register("userSearch")}
              type="text"
              id="userSearch"
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
    </>
  );
};

export default ItemSearchForm;
