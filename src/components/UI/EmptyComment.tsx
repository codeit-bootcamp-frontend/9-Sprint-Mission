import Image, { StaticImageData } from "next/image";
import EmptyCommentImage from "/images/ui/empty-comment.png";

interface EmptyStateProps {
  text: string;
  imageComponent?: StaticImageData; // PNG 타입만 지원
}

const EmptyComment = ({
  text,
  imageComponent = EmptyCommentImage,
}: EmptyStateProps) => {
  return (
    <div className="m-6 flex flex-col items-center gap-6">
      <Image
        src={imageComponent}
        alt="Empty Comment"
        width={140}
        height={140}
      />
      <p
        className="text-center text-gray-400 text-base leading-6"
        dangerouslySetInnerHTML={{ __html: text }} // text에 포함된 <br /> 태그를 파싱
      />
    </div>
  );
};

export default EmptyComment;
