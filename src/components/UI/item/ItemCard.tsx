// src/components/UI/item/itemCard.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeartIcon from "@/images/icons/ic_heart.svg";
import NoImage from "@/images/ui/no-image.png";
import { Product } from "@/types/product";

interface ItemCardProps {
  item: Product;
  width?: number;
  height?: number;
}

const ItemCard = ({ item, width, height }: ItemCardProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const validateAndSetImageUrl = async (url: string) => {
      if (url.includes("sprint-fe-project.s3.ap-northeast-2.amazonaws.com")) {
        setImageUrl(url);
      } else {
        try {
          const response = await fetch(
            `/api/imageProxy?url=${encodeURIComponent(url)}`
          );
          if (response.ok) {
            setImageUrl(`/api/imageProxy?url=${encodeURIComponent(url)}`);
          } else {
            console.log("이미지를 불러올 수 없습니다: ", response.status);
            setImageUrl(NoImage.src);
          }
        } catch (error) {
          console.error("이미지를 불러올 수 없습니다: ", error);
          setImageUrl(NoImage.src);
        }
      }
    };

    if (item.images[0]) {
      validateAndSetImageUrl(item.images[0]);
    } else {
      setImageUrl(NoImage.src);
    }
  }, [item.images]);
  return (
    <Link
      href={`/items/${item.id}`}
      className="block text-gray-800 overflow-hidden cursor-pointer"
    >
      <div className="w-full pb-[100%] relative mb-4">
        <Image
          src={imageUrl}
          alt="상품 썸네일"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
          width={width}
          height={height}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">
          {item.name}
        </div>
        <p className="text-base font-bold">{item.price.toLocaleString()}원</p>
        <div className="flex items-center gap-1 text-gray-600 text-xs">
          <HeartIcon />
          <span>{item.favoriteCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
