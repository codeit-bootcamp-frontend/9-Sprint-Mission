import { ISearchList } from "@/types/boardsTypeShare";
import Image from "next/image";

interface IProps {
  allPost: ISearchList[];
  searchList: ISearchList[];
}

const AllPostMap = ({ allPost, searchList }: IProps) => {
  const renderList = searchList.length > 0 ? searchList : allPost;

  return (
    renderList.map((item) => (
      <div
        key={item.id}
        className="flex flex-col space-y-4 bg-[#FCFCFC] pb-6 border-b-[1px] border-[--color-gray200]"
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold w-[263px] md:w-[616px]">{item.content}</p>
          <div className="bg-white w-[72px] h-[72px] flex items-center justify-center rounded-lg border-[0.75px] border-[--color-gray200]">
            <Image
              src={item.image || "/icons/question.png"}
              alt="제품 사진"
              width={48}
              height={48}
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/icons/sessionBtn.png" alt="회원프로필" width={24} height={24} />
            <div className="flex items-center space-x-2">
              <h3 className="text-sm text-[#4B5563]">{item.writer.nickname}</h3>
              <span className="text-sm text-[--color-gray400]">
                {item.createdAt.split("T")[0]}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Image src="/icons/ic_heart.svg" alt="좋아요" width={24} height={24} />
            <span className="text-[--color-gray500]">{item.likeCount}</span>
          </div>
        </div>
      </div>
    ))
  )
}

export default AllPostMap;