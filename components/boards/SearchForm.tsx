import { searchSchema } from "@/app/boards/searchConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SearchForm = () => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      userSearch: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors;

  return (
    <form>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 bg-[--color-gray100] px-5 py-2 rounded-xl w-[288px] md:w-[560px] lg:w-[1054px]">
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
        <button
          type="button"
          className="w-[42px] h-[42px] rounded-xl border-[1px] border-[--color-gray200] flex items-center justify-center p-2"
        >
          <Image src="/icons/orderBtn.png" alt="검색" width={24} height={24} />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
