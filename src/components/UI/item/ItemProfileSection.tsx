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

  const isSvgFile = (url: string) => url.toLowerCase().endsWith(".svg");

  useEffect(() => {
    const validateImageUrl = async (url: string) => {
      try {
        const proxyUrl = `/api/imageProxy?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (response.ok) {
          setImageUrl(proxyUrl);
        } else {
          console.log("No image available: ", response.status);
          setImageUrl(null);
        }
      } catch (error) {
        console.error("No image available: ", error);
      }
    };

    if (product.images[0]) {
      validateImageUrl(product.images[0]);
    }
  }, [product.images]);

  const handleLike = () => {
    // 여기에 좋아요 처리 로직을 구현하세요
    console.log(`상품 ${product.id} 좋아요 토글`);
  };

  return (
    <section className="flex flex-col gap-4 md:flex-row lg:gap-6">
      <div className="w-full md:w-2/5 md:max-w-[486px]">
        {imageUrl ? (
          isSvgFile(imageUrl) ? (
            <img
              src={imageUrl}
              alt={`${product.name} 상품 대표 사진`}
              className="rounded-xl w-full h-auto"
            />
          ) : (
            <Image
              src={imageUrl}
              alt={`${product.name} 상품 대표 사진`}
              width={486}
              height={486}
              className="rounded-xl w-full h-auto"
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
