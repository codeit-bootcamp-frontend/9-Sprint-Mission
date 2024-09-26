// src/components/UI/item/itemCard.tsx
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import HeartIcon from "@/images/icons/ic_heart.svg";
import NoImage from "@/images/ui/no-image.png";
import allowedDomains from "allowedDomains";

interface ItemCardProps {
  item: Product;
  width?: number;
  height?: number;
  onLoad?: () => void;
  priority?: boolean; // LCP 이미지 우선 로드 여부
}

// 캐시를 위한 객체 추가
const validImageCache: { [url: string]: boolean } = {};

// 이미지를 사전에 검증하는 함수
const isValidImageUrl = async (url: string): Promise<boolean> => {
  if (url in validImageCache) {
    return validImageCache[url];
  }

  try {
    const urlObj = new URL(url);
    if (allowedDomains.includes(urlObj.hostname)) {
      validImageCache[url] = true;
      return true;
    }

    // CORS 문제를 피하기 위해 no-cors 모드는 제거
    const response = await fetch(url, { method: "HEAD" });
    const isValid =
      (response.ok &&
        response.headers.get("Content-Type")?.startsWith("image/")) ||
      false;
    validImageCache[url] = isValid;
    return isValid;
  } catch (error) {
    console.error("이미지 검증 중 오류 발생:", url, error);
    validImageCache[url] = false;
    return false;
  }
};

const ItemCard = ({
  item,
  width = 200,
  height = 200,
  onLoad,
}: ItemCardProps) => {
  const [imageUrl, setImageUrl] = useState<string>(NoImage.src); // 대체 이미지 기본값
  const [imageLoaded, setImageLoaded] = useState(false); // 로딩 상태
  const [imageError, setImageError] = useState(false); // 이미지 로딩 실패 여부
  const isFirstRender = useRef(true); // 첫 렌더링을 추적하는 ref

  // 이미지 변경 시 로딩 상태 초기화
  useEffect(() => {
    if (!isFirstRender.current) {
      setImageLoaded(false);
      setImageError(false); // 이미지 변경 시 에러 상태 초기화
    }
  }, [item.images]);

  // 이미지 검증 후 설정
  useEffect(() => {
    const controller = new AbortController(); // AbortController 추가

    const validateAndSetImageUrl = async () => {
      if (item.images && item.images[0]) {
        try {
          const isValid = await isValidImageUrl(item.images[0]);
          if (isValid) {
            setImageUrl(item.images[0]);
          } else {
            console.warn("유효하지 않은 이미지 URL:", item.images[0]);
            setImageUrl(NoImage.src); // 대체 이미지 설정
            setImageError(true); // 에러 상태로 설정
          }
        } catch (error) {
          console.error("이미지 검증 오류:", error);
          setImageError(true);
        }
      } else {
        setImageUrl(NoImage.src); // 이미지가 없는 경우 기본 이미지 설정
        setImageError(true);
      }
      isFirstRender.current = false;
    };

    validateAndSetImageUrl();

    // 컴포넌트 언마운트 시 요청 취소
    return () => {
      controller.abort();
    };
  }, [item.images]);

  return (
    <Link
      href={`/items/${item.id}`}
      className="block text-gray-800 overflow-hidden cursor-pointer"
    >
      <div className="w-full pb-[100%] relative mb-4">
        {/* 로딩 상태 처리 */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* 이미지 컴포넌트 */}
        <Image
          src={imageUrl} // 검증된 이미지 URL
          alt="상품 썸네일"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
          width={width}
          height={height}
          unoptimized={imageUrl.endsWith(".gif")} // 애니메이션 GIF는 최적화하지 않음
          onLoad={() => {
            setImageLoaded(true); // 이미지 로드 완료 시 로딩 상태 해제
            if (onLoad) onLoad(); // 부모 컴포넌트에서 전달된 onLoad 호출
          }}
          onError={() => {
            setImageError(true); // 이미지 로딩 실패 시 에러 상태 설정
            setImageUrl(NoImage.src); // 로딩 실패 시 대체 이미지로 변경
            setImageLoaded(true); // 이미지 로딩 실패 시 로딩 상태 해제
          }}
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
