import Image from "next/image";
import Link from "next/link";

const ImgWrapperUpper = () => {
  return (
    <div className="bg-[--color-bg-skyblue]">
      <div className="flex flex-col items-center justify-center pt-[70px] space-y-32 lg:flex-row lg:space-x-16">
        <div className="flex flex-col space-y-8 break-keep w-[240px] mt-12 md:w-3/4 lg:w-[357px]">
          <h1 className="font-bold text-[32px] text-center text-[--color-gray700] leading-[44.8px] md:text-[40px] md:leading-[56px] lg:text-start">
            일상의 모든 물건을 거래해 보세요
          </h1>
          <Link
            href="/items"
            className="p-3 text-center bg-[--color-theme] rounded-full font-semibold text-xl text-[--color-gray50] transition-all hover:bg-[--color-theme-hover]"
          >
            구경하러 가기
          </Link>
        </div>
        <div className="mt-24">
          <Image
            src="/images/Img_home_top.png"
            alt="상단 이미지"
            width={746}
            height={340}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ImgWrapperUpper;
