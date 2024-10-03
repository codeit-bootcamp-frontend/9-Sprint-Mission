import Image from "next/image";

// public 폴더 경로 문자열로 대체
const EmptyInquiryImage = "/images/ui/empty-inquiry.png";

interface EmptyStateProps {
  text: string;
}

const EmptyInquiry = ({ text }: EmptyStateProps) => {
  return (
    <div className="m-6 flex flex-col items-center gap-6">
      <Image
        src={EmptyInquiryImage}
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
