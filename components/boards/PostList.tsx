import { useCallback, useEffect, useState } from "react";
import { ISearchList } from "@/app/boards/boardsTypeShare";
import { instance } from "@/lib/axios";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import Pagenation from "./Pagenation";
import { CalculateWidth } from "@/context/calculateWidth";

interface IProps {
  searchList: ISearchList[];
  searchLoading: boolean;
  orderBy: string;
}

// 전체 게시글 가져오는 컴포넌트
const PostList = ({ searchList, orderBy }: IProps) => {
  const width: number = CalculateWidth("all");

  const [posts, setPosts] = useState<ISearchList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  
  const renderList = searchList.length > 0 ? searchList : posts;
  const isMobile = width === 4;

  const getPosts = useCallback(async () => {
    try {
      const response = await instance.get(`/articles?page=${page}&pageSize=${width}&orderBy=${orderBy}`);

      if (response.status === 200) {
        setPosts(response.data.list);
        setTotalPage(Math.ceil(response.data.totalCount / width));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("boards getPosts 함수에서 api 오류 발생", error);
        toast.error(error.response?.data);
      } else {
        console.error("boards getPosts 함수에서 알 수 없는 오류 발생", error);
        toast.error("오류가 발생하여 게시글을 불러오지 못했습니다. 잠시 후 새로고침해주세요.");
      }
    } 
  }, [page, orderBy, width]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);
  
  return (
    <div className="flex flex-col space-y-6">
      {renderList.map((item) => (
        <div
          key={item.id}
          className="flex flex-col space-y-4 bg-[#FCFCFC] pb-6 border-b-[1px] border-[--color-gray200]"
        >
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold w-[263px] md:w-[616px]">{item.content}</p>
            <div className="bg-white w-[72px] h-[72px] flex items-center justify-center rounded-lg border-[0.75px] border-[--color-gray200]">
              <Image src={item.image || "/icons/question.png"} alt="제품 사진" width={48} height={48} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image src="/icons/sessionBtn.png" alt="회원프로필" width={24} height={24} />
              <div className="flex items-center space-x-2">
                <h3 className="text-sm text-[#4B5563]">{item.writer.nickname}</h3>
                <span className="text-sm text-[--color-gray400]">{item.createdAt.split("T")[0]}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Image src="/icons/ic_heart.svg" alt="좋아요" width={24} height={24} />
              <span className="text-[--color-gray500]">{item.likeCount}</span>
            </div>
          </div>
        </div>
      ))}
      {searchList.length === 0 && <Pagenation totalPage={totalPage} page={page} setPage={setPage} isMobile={isMobile} />}
    </div>
  );
};

export default PostList;
