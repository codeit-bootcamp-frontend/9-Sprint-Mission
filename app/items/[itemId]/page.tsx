"use client";

import BackToListBtn from "@/components/BackToListBtn";
import CommentsContents from "@/components/CommentsContents";
import ItemCommentForm from "@/components/items/ItemCommentForm";
import { instance } from "@/lib/axios";
import { IComment } from "@/types/boardsTypeShare";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IItem {
  images: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
}

const ItemDetail = () => {
  const { itemId } = useParams();
  const id = Number(itemId);

  const [item, setItem] = useState<IItem>();
  const [itemComments, setItemComments] = useState<IComment[]>([]);

  const getItem = useCallback(async () => {
    try {
      const response = await instance.get(`/products/${itemId}`);

      if (response.status === 200) {
        setItem(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("중고마켓 getItem에서 api 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    }
  }, [itemId]);

  const getItemComments = useCallback(async () => {
    try {
      const response = await instance.get(`/products/${itemId}/comments?limit=10`);

      if (response.status === 200) {
        setItemComments(response.data.list);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("중고마켓 getItemComments에서 api 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    }
  }, [itemId]);

  useEffect(() => {
    getItem();
    getItemComments();
  }, [getItem, getItemComments]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-10 border-b border-[--color-gray200] pb-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:justify-between">
          <Image
            src={item?.images ? item.images[0] : "/icons/question.png"}
            alt="제품 사진"
            width={343}
            height={343}
            className="object-cover w-full rounded-xl md:w-[340px] md:h-[340px]"
          />
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4 w-full">
              <div className="border-b border-[--color-gray200] pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{item?.name}</h2>
                  <button>
                    <Image src="/icons/itemMenu.png" alt="메뉴" width={24} height={24} />
                  </button>
                </div>
                <h3 className="font-semibold text-2xl">{item?.price.toLocaleString("ko-KR")}원</h3>
              </div>
              <div className="flex flex-col space-y-6">
                <h2 className="font-semibold text-sm">상품 소개</h2>
                <p>{item?.description}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <h2 className="font-semibold text-sm">상품 태그</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  {item?.tags.map((tag) => (
                    <span key={tag} className="px-4 py-[6px] bg-[--color-gray100] rounded-full">
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
                <h4 className="text-sm font-medium">{item?.ownerNickname}</h4>
                <span className="text-sm text-[--color-gray400]">
                  {item?.createdAt.split("T")[0]}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-[1px] bg-[--color-gray200] h-8" />
              <button className="flex items-center space-x-1 px-3 py-1 rounded-full border border-[--color-gray200]">
                <Image
                  src="/icons/ic_heart.svg"
                  alt="좋아요"
                  width={24}
                  height={24}
                  className="md:w-8 md:h-8"
                />
                <span className="font-medium text-[--color-gray500]">{item?.favoriteCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-10">
        <ItemCommentForm itemId={id} setItemComments={setItemComments} />
      </div>
      {itemComments.length > 0 ? (
        <div className="flex flex-col space-y-10">
          <CommentsContents comments={itemComments} />
        </div>
      ) : (
        <div className="flex flex-col space-y-4 w-[151px] m-auto">
          <Image src="/images/commentEmpty.png" alt="댓글 없음" width={140} height={140} />
          <span className="break-keep text-center text-[--color-gray400]">아직 문의가 없어요</span>
        </div>
      )}
      <BackToListBtn />
    </div>
  );
};

export default ItemDetail;
