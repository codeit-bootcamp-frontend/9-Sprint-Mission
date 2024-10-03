import Image, { StaticImageData } from "next/image";
import EmptyInquiryImage from "/images/ui/empty-inquiry.png";

interface EmptyStateProps {
  text: string;
  imageComponent?: StaticImageData; // PNG 타입만 지원
}

const EmptyInquiry = ({
  text,
  imageComponent = EmptyInquiryImage,
}: EmptyStateProps) => {
  return (
    <div className="m-6 flex flex-col items-center gap-6">
      <Image
        src={imageComponent}
        alt="Empty Inquiry"
        width={196}
        height={196}
        sizes="(max-width: 768px) 140px, (min-width: 768px) 196px"
      />
      <p className="text-gray-400 text-base leading-6">{text}</p>
    </div>
  );
};

export default EmptyInquiry;
