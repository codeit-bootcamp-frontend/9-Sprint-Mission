// src/components/UI/item/ItemDetailSection.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TagDisplay from "./TagDisplay";
import LikeButton from "./LikeButton";
import { ProductDetail } from "@/types/product";

// public 폴더 경로 문자열로 대체
const KebabIcon = "/images/icons/ic_kebab.png";
const NoImage = "/images/ui/no-image.png";

interface ItemDetailSectionProps {
  productDetail: ProductDetail;
}

const ItemDetailSection = ({ productDetail }: ItemDetailSectionProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 URL 상태
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading"); // 이미지 로딩 상태

  // URL이 SVG 파일인지 확인하는 함수
  const isSvgFile = (url: string) => url.toLowerCase().endsWith(".svg");

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 마운트된 상태인지 확인하기 위한 변수

    const loadImage = () => {
      if (!productDetail.images[0]) {
        // 이미지가 없는 경우
        if (isMounted) {
          setImageStatus("error");
        }
        return;
      }

      const originalUrl = productDetail.images[0];
      if (isSvgFile(originalUrl)) {
        // SVG 파일인 경우 원본 URL 사용
        if (isMounted) {
          setImageUrl(originalUrl);
          setImageStatus("loaded");
        }
      } else {
        // 기타 이미지인 경우 프록시 URL 사용
        const proxyUrl = `/api/imageProxy?url=${encodeURIComponent(
          originalUrl
        )}`;
        if (isMounted) {
          setImageUrl(proxyUrl);
          setImageStatus("loaded");
        }
      }
    };

    // 이미지 로딩 상태를 "loading"으로 설정하고 이미지 로드 시작
    setImageStatus("loading");
    loadImage();

    // 컴포넌트 언마운트 시 isMounted를 false로 설정하여 메모리 누수 방지
    return () => {
      isMounted = false;
    };
  }, [productDetail.images]);

  const handleLike = () => {
    // 여기에 좋아요 처리 로직을 구현하세요
    console.log(`상품 ${productDetail.id} 좋아요 토글`);
  };

  return (
    <section className="flex flex-col gap-4 md:flex-row lg:gap-6">
      {/* 이미지 영역 */}
      <div className="w-full md:w-2/5 md:max-w-[486px]">
        {imageStatus === "loading" ? (
          // 로딩 중일 때 스피너 표시
          <div className="w-full h-[486px] flex items-center justify-center bg-gray-200 rounded-xl">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : imageStatus === "loaded" && imageUrl ? (
          isSvgFile(imageUrl) ? (
            // SVG 파일은 img 태그로 렌더링
            <img
              src={imageUrl}
              alt={`${productDetail.name} 상품 대표 사진`}
              className="rounded-xl w-full h-auto"
              width={486}
              height={486}
            />
          ) : (
            // 그 외의 이미지는 Next.js Image 컴포넌트 사용
            <Image
              src={imageUrl}
              alt={`${productDetail.name} 상품 대표 사진`}
              width={486}
              height={486}
              className="rounded-xl w-full h-auto"
              unoptimized={true}
              onError={() => setImageStatus("error")} // 이미지 로드 실패 시 상태 변경
            />
          )
        ) : (
          // 이미지 로드 실패 시 기본 이미지 표시
          <Image
            src={NoImage}
            alt="이미지 없음"
            width={486}
            height={486}
            className="rounded-xl w-full h-auto"
          />
        )}
      </div>

      {/* 상품 정보 및 좋아요 버튼 */}
      <div className="flex flex-col justify-between flex-1 items-start">
        <div className="w-full relative">
          {/* 더보기 버튼 */}
          <button className="absolute right-0">
            <Image
              src={KebabIcon}
              width={24}
              height={24}
              alt="케밥 이미지 버튼"
              className="w-6 h-6"
            />
          </button>

          {/* 상품 이름 및 가격 */}
          <div>
            <div className="text-base font-semibold mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">
              {productDetail.name}
            </div>
            <div className="text-2xl font-semibold md:text-3xl lg:text-4xl">
              {productDetail.price.toLocaleString()}원
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          {/* 상품 소개 */}
          <div>
            <div className="text-gray-600 text-sm font-medium mb-2">
              상품 소개
            </div>
            <p className="text-base leading-[140%]">
              {productDetail.description}
            </p>
          </div>

          {/* 상품 태그 */}
          <div className="my-6">
            <div className="text-gray-600 text-sm font-medium mb-2">
              상품 태그
            </div>
            <TagDisplay tags={productDetail.tags} />
          </div>
        </div>

        {/* 좋아요 버튼 */}
        <LikeButton
          isFavorite={productDetail.isFavorite}
          favoriteCount={productDetail.favoriteCount}
          onLike={handleLike}
        />
      </div>
    </section>
  );
};

export default ItemDetailSection;
