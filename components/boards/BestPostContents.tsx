import { ISearchList } from "@/types/boardsTypeShare";
import Image from "next/image";
import Link from "next/link";

interface IPrpos {
  bestPost: ISearchList[];
}

const BestPostContents = ({ bestPost }: IPrpos) => {
  return bestPost.map((post) => (
    <Link
      key={post.id}
      href={`/boards/${post.id}`}
      className="flex flex-col space-y-4 bg-[--color-gray50] px-6 pb-4 rounded-lg"
    >
      <div className="bg-[--color-theme] flex items-center justify-center space-x-1 w-[102px] rounded-bl-2xl rounded-br-2xl px-6 py-[2px]">
        <Image src="/icons/ic_medal.svg" alt="메달" width={16} height={16} />
        <span className="text-white font-semibold">Best</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg leading-7 w-44">{post.content}</p>
        <div className="bg-white w-[72px] h-[72px] flex items-center justify-center rounded-lg border-[0.75px] border-[--color-gray200]">
          <Image src={post.image || "/icons/question.png"} alt="제품 사진" width={48} height={48} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-[#4B5563]">{post.writer.nickname}</p>
          <div className="flex items-center space-x-1">
            <Image src="/icons/ic_heart.svg" alt="좋아요" width={16} height={16} />
            <span className="text-sm text-[#4B5563]">{post.likeCount}</span>
          </div>
        </div>
        <p className="text-sm text-[--color-gray400]">{post.createdAt.split("T")[0]}</p>
      </div>
    </Link>
  ));
};

export default BestPostContents;
