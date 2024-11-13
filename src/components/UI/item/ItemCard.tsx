// src/components/UI/item/ItemCard.tsx
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { isValidImageUrl } from "@/utils/imageUtils";

const HEART_ICON = "/images/icons/ic_heart.png";
const NO_IMAGE = "/images/ui/no-image.png";

interface ItemCardProps {
  item: Product;
  width?: number;
  height?: number;
  onLoad?: () => void;
  priority?: boolean;
}

const ItemCard = ({ item, width = 200, height = 200, onLoad, priority = false }: ItemCardProps) => {
  const [imageUrl, setImageUrl] = useState<string>(NO_IMAGE);
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading");

  // 이미지 URL 처리 로직
  const imageInfo = useMemo(() => {
    if (item.images && item.images[0] && isValidImageUrl(item.images[0])) {
      const originalUrl = item.images[0];
      const fileExtension = originalUrl.split(".").pop()?.toLowerCase();

      // SVG나 GIF는 원본 URL 사용
      if (fileExtension === "svg" || fileExtension === "gif") {
        return {
          url: originalUrl,
          isSpecialFormat: true,
        };
      }

      // 일반 이미지는 프록시 사용
      return {
        url: `/api/imageProxy?url=${encodeURIComponent(originalUrl)}&w=${width}&q=75`,
        isSpecialFormat: false,
      };
    }

    return {
      url: NO_IMAGE,
      isSpecialFormat: false,
    };
  }, [item.images, width]);

  // 이미지 URL 설정
  useEffect(() => {
    if (imageInfo.url) {
      setImageUrl(imageInfo.url);
      setImageStatus("loading");
    }
  }, [imageInfo.url]);

  const handleImageLoad = () => {
    setImageStatus("loaded");
    onLoad?.();
  };

  const handleImageError = () => {
    console.error("이미지 로드 실패:", imageUrl);
    setImageUrl(NO_IMAGE);
    setImageStatus("error");
  };

  return (
    <Link href={`/items/${item.id}`} className="block text-gray-800 overflow-hidden cursor-pointer">
      <div className="w-full pb-[100%] relative mb-4">
        {/* 로딩 스피너 */}
        {imageStatus === "loading" && imageUrl !== NO_IMAGE && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {imageInfo.isSpecialFormat ? (
          // SVG나 GIF는 일반 img 태그 사용
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={item.name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          // 일반 이미지는 Next.js Image 컴포넌트 사용
          <Image
            src={imageUrl}
            alt={item.name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            width={width}
            height={height}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={priority}
          />
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</div>
        <p className="text-base font-bold">{item.price.toLocaleString()}원</p>
        <div className="flex items-center gap-1 text-gray-600 text-xs">
          <Image src={HEART_ICON} width={16} height={16} alt="좋아요" />
          <span>{item.favoriteCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
