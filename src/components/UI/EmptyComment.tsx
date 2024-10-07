// src/components/UI/EmptyComment.tsx
import Image from "next/image";

// public 폴더 경로 문자열로 대체
const EMPTY_COMMENT_IMAGE = "/images/ui/empty-comment.png";

interface EmptyStateProps {
  text: string;
}

const EmptyComment = ({ text }: EmptyStateProps) => {
  return (
    <div className="m-6 flex flex-col items-center gap-6">
      <Image
        src={EMPTY_COMMENT_IMAGE}
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
