import { formatCommentsTime } from "@/lib/utils";
import { IComment } from "@/types/boardsTypeShare";
import Image from "next/image";

interface IProps {
  comments: IComment[];
}

// 수정 필요 - 개선사항 참고 
const CommentsContents = ({ comments }: IProps) => {
  const formattedCommentCreateTime = comments.map((comment) =>
    formatCommentsTime(comment.createdAt)
  );

  return comments.map((comment) => (
    <div key={comment.id} className="flex flex-col space-y-6 bg-[#FCFCFC]">
      <div className="flex items-center justify-between">
        <p className="text-sm">{comment.content}</p>
        <button>
          <Image src="/icons/itemMenu.png" alt="메뉴" width={24} height={24} />
        </button>
      </div>
      <div className="flex items-center space-x-2 pb-3 border-b border-[--color-gray200]">
        <Image
          src={comment.writer.image || "/icons/sessionBtn.png"}
          alt="유저프로필"
          width={32}
          height={32}
        />
        <div className="flex flex-col space-y-1">
          <h3 className="text-xs text-[#4B5563]">{comment.writer.nickname}</h3>
          <span className="text-xs text-[--color-gray400]">{formattedCommentCreateTime[0]}</span>
        </div>
      </div>
    </div>
  ));
};

export default CommentsContents;
