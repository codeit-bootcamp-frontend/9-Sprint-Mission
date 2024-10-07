import Image from "next/image";
import InquiryEmpty from "@/assets/images/ui/empty-comments.svg";

const EnquiryEmpty = () => {
  return (
    <div style={{ position: "relative" }}>
      <Image src={InquiryEmpty} fill alt="아직 문의가 없어요" />
      <p>아직 문의가 없어요</p>
    </div>
  );
};

export default EnquiryEmpty;
