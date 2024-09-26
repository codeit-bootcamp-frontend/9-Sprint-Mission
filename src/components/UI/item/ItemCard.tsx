// src/components/UI/item/itemCard.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import HeartIcon from "@/images/icons/ic_heart.svg";
import NoImage from "@/images/ui/no-image.png";
import allowedDomains from "allowedDomains";
import disallowedDomains from "disallowedDomains";

interface ItemCardProps {
  item: Product;
  width?: number;
  height?: number;
  onLoad?: () => void;
  priority?: boolean;
}

const ItemCard = ({
  item,
  width = 200,
  height = 200,
  onLoad,
  priority = false,
}: ItemCardProps) => {
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");
  const imageUrl =
    item.images &&
    item.images[0] &&
    allowedDomains.some((domain) => item.images[0].includes(domain)) &&
    !disallowedDomains.some((domain) => item.images[0].includes(domain))
      ? `/api/imageProxy?url=${encodeURIComponent(item.images[0])}`
      : NoImage.src;

  useEffect(() => {
    setImageStatus("loading");
  }, [item.images]);

  return (
    <Link
      href={`/items/${item.id}`}
      className="block text-gray-800 overflow-hidden cursor-pointer"
    >
      <div className="w-full pb-[100%] relative mb-4">
        {imageStatus === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        <Image
          src={imageStatus === "error" ? NoImage.src : imageUrl}
          alt="상품 썸네일"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
          width={width}
          height={height}
          unoptimized={imageUrl.endsWith(".gif")}
          onLoad={() => {
            setImageStatus("loaded");
            if (onLoad) onLoad();
          }}
          onError={() => {
            setImageStatus("error");
            console.error(`이미지 로드 실패: ${imageUrl}`);
          }}
          priority={priority}
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
