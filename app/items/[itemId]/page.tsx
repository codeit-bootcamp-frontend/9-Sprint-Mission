"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { CommentType, ItemListType } from "../types/Items";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import Comments from "./components/Comments";

const getItem = async (productId: number) => {
  if (!productId) return null;

  try {
    const response = await instance.get(`/products/${productId}`);

    if (response.status === 200) {
      return response.data || null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("현재 상품 조회 실패", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }

  return null;
};

const getComments = async (productId: number, cursor: number) => {
  if (!productId) return { list: [], nextCursor: null };

  try {
    const response = await instance.get(
      `/products/${productId}/comments?limit=10&cursor=${cursor}`
    );

    if (response.status === 200) {
      const { list, nextCursor } = response.data;
      return { list, nextCursor };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("현재 상품 댓글 조회 실패", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }

  return { list: [], nextCursor: null };
};

const ItemDetail = () => {
  const { itemId } = useParams();
  const id = Number(itemId);
  const {
    data: itemData,
    isPending,
    isError,
  } = useQuery<ItemListType, Error>({
    queryKey: ["item", itemId],
    queryFn: () => getItem(id),
    enabled: !!id,
  });
  const { data: commentsData } = useQuery<CommentType, Error>({
    queryKey: ["comments", itemId],
    queryFn: () => getComments(id, 0),
    enabled: !!id,
  });

  if (isPending)
    return (
      <p className="text-center font-bold text-xl mt-20">상품 데이터를 불러오는 중입니다...</p>
    );
  if (isError)
    return (
      <p className="text-center font-bold text-xl mt-20">
        상품 데이터를 불러오는 중 오류가 발생했습니다.
      </p>
    );

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-10 border-b border-panda-gray200 pb-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <Image
            src={itemData?.images ? itemData.images[0] : "/icons/question.png"}
            alt="제품 사진"
            width={343}
            height={343}
            className="object-cover w-full rounded-xl md:w-[340px] md:h-[340px]"
          />
          <div className="flex flex-col space-y-4 w-full">
            <div className="border-b border-panda-gray200 pb-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{itemData?.name}</h2>
                <button>
                  <Image src="/icons/itemMenu.png" alt="메뉴" width={24} height={24} />
                </button>
              </div>
              <h3 className="font-semibold text-2xl">
                {itemData?.price.toLocaleString("ko-KR")}원
              </h3>
            </div>
            <div className="flex flex-col space-y-6">
              <h2 className="font-semibold text-sm">상품 소개</h2>
              <p>{itemData?.description}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <h2 className="font-semibold text-sm">상품 태그</h2>
              <div className="flex items-center gap-2 flex-wrap">
                {itemData?.tags.map((tag, i) => (
                  <span key={i} className="px-4 py-[6px] bg-panda-gray100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/icons/sessionBtn.png" alt="프로필 사진" width={40} height={40} />
            <div className="flex flex-col space-y-[2px]">
              <h4 className="text-sm font-medium">{itemData?.ownerNickname}</h4>
              <span className="text-sm text-panda-gray400">
                {itemData?.createdAt.split("T")[0]}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-[1px] bg-panda-gray200 h-8" />
            <button className="flex items-center space-x-1 px-3 py-1 rounded-full border border-panda-gray200">
              <Image
                src="/icons/ic_heart.svg"
                alt="좋아요"
                width={24}
                height={24}
                className="md:size-8"
              />
              <span className="font-medium text-panda-gray500">{itemData?.favoriteCount}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-10">댓글 폼</div>
      {commentsData?.list.length && commentsData?.list.length > 0 ? (
        <div className="flex flex-col space-y-10">
          <Comments commentsData={commentsData.list} />
        </div>
      ) : (
        <div className="flex flex-col space-y-4 w-[151px] m-auto">
          <Image src="/images/commentEmpty.png" alt="댓글 없음" width={140} height={140} />
          <span className="break-keep text-center text-panda-gray400">아직 문의가 없어요</span>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
