// src/components/UI/item/ItemCard.tsx
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { isValidImageUrl } from "@/utils/imageUtils"; // 확장자 체크 함수

// public 폴더 경로 문자열로 대체
const HeartIcon = "/images/icons/ic_heart.png";
const NoImage = "/images/ui/no-image.png";

interface ItemCardProps {
  item: Product;
  width?: number;
  height?: number;
  onLoad?: () => void;
  priority?: boolean;
  unoptimized?: boolean;
}

const ItemCard = ({
  item,
  width = 200,
  height = 200,
  onLoad,
  priority = true,
}: ItemCardProps) => {
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  // 이미지 URL 및 SVG 여부를 판단하기 위한 변수들
  const imageInfo = useMemo(() => {
    if (item.images && item.images[0] && isValidImageUrl(item.images[0])) {
      const originalUrl = item.images[0];
      const isSvg = originalUrl.toLowerCase().endsWith(".svg");

      if (isSvg) {
        // SVG 이미지는 원본 URL 사용
        return {
          url: originalUrl,
          isSvg: true,
        };
      } else {
        // 기타 이미지는 프록시 URL 사용
        return {
          url: `/api/imageProxy?url=${encodeURIComponent(originalUrl)}`,
          isSvg: false,
        };
      }
    }
    // 기본 이미지 설정
    return {
      url: NoImage,
      isSvg: false,
    };
  }, [item.images]);

  useEffect(() => {
    setImageStatus("loading");
  }, [item.images]);

  const handleImageLoad = () => {
    setImageStatus("loaded");
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setImageStatus("error");
    console.error(`이미지 로드 실패: ${imageInfo.url}`);
  };

  // 이미지가 GIF일 경우만 unoptimized 설정
  const isGif = imageInfo.url.endsWith(".gif");

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

        {imageInfo.isSvg ? (
          // SVG 파일은 img 태그로 처리
          <img
            src={imageInfo.url}
            alt="상품 썸네일"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            width={width}
            height={height}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          // GIF 파일만 unoptimized 처리
          <Image
            src={imageStatus === "error" ? NoImage : imageInfo.url}
            alt="상품 썸네일"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            width={width}
            height={height}
            unoptimized={isGif} // GIF 파일에만 적용
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={priority}
          />
        )}
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">
          {item.name}
        </div>
        <p className="text-base font-bold">{item.price.toLocaleString()}원</p>
        <div className="flex items-center gap-1 text-gray-600 text-xs">
          <Image
            src={HeartIcon}
            width={16}
            height={16}
            alt="좋아요 이미지 버튼"
          />
          <span>{item.favoriteCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
