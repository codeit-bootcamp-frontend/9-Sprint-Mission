import Image from "next/image";

const MainContents = () => {
  return (
    <main>
      <div className="p-6 my-6 flex flex-col space-y-12 lg:space-y-[138px] lg:my-[138px]">
        <div className="mainPage-contentsBox">
          <Image src="/images/Img_home_01.png" alt="메인이미지" width={344} height={259} className="w-full lg:w-[579px]" />
          <div className="flex flex-col space-y-5">
            <h2 className="text-[--color-theme] font-bold md:text-lg">Hot Items</h2>
            <p className="text-[--color-gray700] font-bold text-2xl md:text-4xl">인기 상품을 확인해 보세요</p>
            <p className="text-[--color-gray700] font-medium md:text-2xl">
              가장 HOT한 중고거래 물품을 <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse space-y-6 py-6 break-keep md:w-[720px] lg:flex-row lg:space-x-16 lg:space-y-0 lg:items-center lg:m-auto lg:justify-between bg-[#FCFCFC] rounded-xl lg:px-6 lg:w-[988px]">
          <div className="flex flex-col space-y-5 text-end mt-6 md:mt-0">
            <h2 className="text-[--color-theme] font-bold md:text-lg">Search</h2>
            <p className="text-[--color-gray700] font-bold text-2xl md:text-4xl">구매를 원하는 상품을 검색하세요</p>
            <p className="text-[--color-gray700] font-medium md:text-2xl">
              구매하고 싶은 물품은 검색해서 <br />
              쉽게 찾아보세요
            </p>
          </div>
          <Image src="/images/Img_home_02.png" alt="메인이미지" width={344} height={259} className="w-full lg:w-[579px]" />
        </div>
        <div className="mainPage-contentsBox ">
          <Image src="/images/Img_home_03.png" alt="메인이미지" width={344} height={259} className="w-full lg:w-[579px]" />
          <div className="flex flex-col space-y-5">
            <h2 className="text-[--color-theme] font-bold md:text-lg">Register</h2>
            <p className="text-[--color-gray700] font-bold text-2xl md:text-4xl">판매를 원하는 상품을 등록하세요</p>
            <p className="text-[--color-gray700] font-medium md:text-2xl">
              어떤 물건이든 판매하고 싶은 상품을 <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainContents;