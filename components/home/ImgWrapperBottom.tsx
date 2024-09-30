import Image from "next/image";

const ImgWrapperBottom = () => {
  return (
    <div className="bg-[--color-bg-skyblue]">
      <div className="flex flex-col items-center justify-center pt-[70px] space-y-32 lg:flex-row lg:space-x-16">
        <div className="flex flex-col space-y-8 break-keep w-[240px] mt-12 md:w-3/4 lg:w-[357px]">
          <h2 className="font-bold text-[32px] text-center text-[--color-gray700] leading-[44.8px] md:text-[40px] md:leading-[56px] lg:text-start">
            믿을 수 있는 <br />
            판다마켓 중고거래
          </h2>
        </div>
        <div className="mt-24">
          <Image
            src="/images/Img_home_bottom.png"
            alt="하단 이미지"
            width={746}
            height={340}
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default ImgWrapperBottom;