import { CommentType } from "@/app/items/types/Items";
import { formatCommentsTime } from "@/lib/utils";
import Image from "next/image";

const Comments = ({ commentsData }: { commentsData: CommentType["list"] }) => {
  return commentsData.map((comment) => (
    <div key={comment.id} className="flex flex-col space-y-6 bg-[#FCFCFC]">
      <div className="flex items-center justify-between">
        <p className="text-sm">{comment.content}</p>
        <button>
          <Image src="/icons/itemMenu.png" alt="메뉴" width={24} height={24} />
        </button>
      </div>
      <div className="flex items-center space-x-2 pb-3 border-b border-panda-gray200">
      <Image
          src={comment.writer.image || "/icons/sessionBtn.png"}
          alt="유저프로필"
          width={32}
          height={32}
        />
        <div className="flex flex-col space-y-1">
          <h3 className="text-xs text-panda-gray600">{comment.writer.nickname}</h3>
          <span className="text-xs text-panda-gray400">{formatCommentsTime(comment.createdAt)}</span>
        </div>
      </div>
    </div >
  ));
};

export default Comments;
