import Image from "next/image";
import { ContentSection as ContentSectionType } from "../types/content";

interface Props extends ContentSectionType {
  className?: string;
}

const MainContentsSection = ({
  imageSrc,
  title,
  subTitle,
  description,
  reverse,
  className = "",
}: Props) => {
  const containerClassName = reverse
    ? "flex flex-col-reverse space-y-6 py-6 break-keep md:w-[720px] lg:flex-row lg:space-x-16 lg:space-y-0 lg:items-center lg:m-auto lg:justify-between bg-[#FCFCFC] rounded-xl lg:px-6 lg:w-[988px]"
    : "landingPage-contentsBox";

  return (
    <div className={`${containerClassName} ${className}`}>
      {!reverse && (
        <Image
          src={imageSrc}
          alt="메인이미지"
          width={344}
          height={259}
          className="w-full lg:w-[579px]"
        />
      )}
      <div className={`flex flex-col space-y-5 ${reverse ? "text-end mt-6 md:mt-0" : ""}`}>
        <h2 className="text-panda-theme font-bold md:text-lg">{title}</h2>
        <p className="text-panda-gray700 font-bold text-2xl md:text-4xl">{subTitle}</p>
        <p className="text-panda-gray700 font-medium md:text-2xl whitespace-pre-line">
          {description}
        </p>
      </div>
      {reverse && (
        <Image
          src={imageSrc}
          alt="메인이미지"
          width={344}
          height={259}
          className="w-full lg:w-[579px]"
        />
      )}
    </div>
  );
};

export default MainContentsSection;
