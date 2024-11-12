import Image from "next/image";
import Link from "next/link";

interface ImgWrapperSectionProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  showLink?: boolean;
}

const ImgWrapperSection = ({ title, imageSrc, imageAlt, showLink = false }: ImgWrapperSectionProps) => {
  return (
    <div className="bg-panda-bg-skyblue">
      <div className="flex flex-col items-center justify-center mt-[70px] space-y-32 lg:flex-row lg:space-x-16">
        <div className="flex flex-col space-y-8 break-keep w-60 mt-12 md:w-3/4 lg:w-[357px]">
          <h2 className="font-bold text-[32px] text-center text-panda-gray700 leading-[44.8px] md:text-[40px] md:leading-[56px] lg:text-start">
            {title}
          </h2>
          {showLink && (
            <Link
              href="/items"
              className="p-3 text-center bg-panda-theme rounded-full font-semibold text-xl text-panda-gray50 transition-colors hover:bg-panda-theme-hover"
            >
              구경하러 가기
            </Link>
          )}
        </div>
        <div className="mt-24">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={746}
            height={340}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ImgWrapperSection;
