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
  const [isValidImage, setIsValidImage] = useState(false);

  useEffect(() => {
    const validateImageUrl = async (url: string) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setIsValidImage(true);
        } else {
          console.log("No image available: ", response.status);
          setIsValidImage(false);
        }
      } catch (error) {
        console.error("No image available: ", error);
        setIsValidImage(false);
      }
    };

    if (item.images[0]) {
      validateImageUrl(item.images[0]);
    } else {
      setIsValidImage(false);
    }
  }, [item.images]);

  return (
    <Link
      href={`/items/${item.id}`}
      className="block text-gray-800 overflow-hidden cursor-pointer"
    >
      <div className="w-full pb-[100%] relative mb-4">
        <Image
          src={isValidImage ? item.images[0] : NoImage}
          alt={`${item.name} 상품 썸네일`}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
          width={width}
          height={height}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h2 className="text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">
          {item.name}
        </h2>
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
