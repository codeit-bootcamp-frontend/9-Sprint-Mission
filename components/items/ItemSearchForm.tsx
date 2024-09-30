import Image from "next/image";

// 제작중
const ItemSearchForm = () => {
  return (
    <>
      <form>
        <div className="flex items-center justify-between relative">
          <div className="flex items-center space-x-3 bg-[--color-gray100] px-5 py-3 rounded-xl w-[288px] md:w-[560px] lg:w-[1054px]">
            <Image src="/icons/search.png" alt="검색" width={15} height={15} />
            <input
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
  )
}

export default ItemSearchForm;