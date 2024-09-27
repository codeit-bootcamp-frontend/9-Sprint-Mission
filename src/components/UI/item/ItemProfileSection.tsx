// src/components/UI/item/ItemProfileSection.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TagDisplay from "./TagDisplay";
import LikeButton from "./LikeButton";
import SeeMoreIcon from "@/images/icons/ic_kebab.svg";
import NoImage from "@/images/ui/no-image.png";
import { Product } from "@/types/product";

interface ItemProfileSectionProps {
  product: Product;
}

const ItemProfileSection = ({ product }: ItemProfileSectionProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  const isSvgFile = (url: string) => url.toLowerCase().endsWith(".svg");

  useEffect(() => {
    const validateImageUrl = async (url: string) => {
      try {
        if (isSvgFile(url)) {
          setImageUrl(url);
          setImageStatus("loaded");
        } else {
          const proxyUrl = `/api/imageProxy?url=${encodeURIComponent(url)}`;
          const response = await fetch(proxyUrl);
          if (response.ok) {
            setImageUrl(proxyUrl);
            setImageStatus("loaded");
          } else {
            console.log("이미지를 사용할 수 없음: ", response.status);
            setImageStatus("error");
          }
        }
      } catch (error) {
        console.error("이미지를 사용할 수 없음: ", error);
        setImageStatus("error");
      }
    };

    if (product.images[0]) {
      validateImageUrl(product.images[0]);
    } else {
      setImageStatus("error");
    }
  }, [product.images]);

  const handleLike = () => {
    // 여기에 좋아요 처리 로직을 구현하세요
    console.log(`상품 ${product.id} 좋아요 토글`);
  };

  return (
    <section className="flex flex-col gap-4 md:flex-row lg:gap-6">
      <div className="w-full md:w-2/5 md:max-w-[486px]">
        {imageStatus === "loading" ? (
          <div className="w-full h-[486px] flex items-center justify-center bg-gray-200 rounded-xl">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : imageStatus === "loaded" && imageUrl ? (
          isSvgFile(imageUrl) ? (
            <img
              src={imageUrl}
              alt={`${product.name} 상품 대표 사진`}
              className="rounded-xl w-full h-auto"
              width={486}
              height={486}
            />
          ) : (
            <Image
              src={imageUrl}
              alt={`${product.name} 상품 대표 사진`}
              width={486}
              height={486}
              className="rounded-xl w-full h-auto"
              unoptimized={true}
            />
          )
        ) : (
          <Image
            src={NoImage}
            alt="이미지 없음"
            width={486}
            height={486}
            className="rounded-xl w-full h-auto"
          />
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 items-start">
        <div className="w-full relative">
          <button className="absolute right-0">
            <SeeMoreIcon />
          </button>

          <div>
            <div className="text-base font-semibold mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">
              {product.name}
            </div>
            <div className="text-2xl font-semibold md:text-3xl lg:text-4xl">
              {product.price.toLocaleString()}원
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <div>
            <div className="text-gray-600 text-sm font-medium mb-2">
              상품 소개
            </div>
            <p className="text-base leading-[140%]">{product.description}</p>
          </div>

          <div className="my-6">
            <div className="text-gray-600 text-sm font-medium mb-2">
              상품 태그
            </div>
            <TagDisplay tags={product.tags} />
          </div>
        </div>

        <LikeButton
          isFavorite={product.isFavorite}
          favoriteCount={product.favoriteCount}
          onLike={handleLike}
        />
      </div>
    </section>
  );
};

export default ItemProfileSection;
