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

    if (product.images[0]) {
      validateImageUrl(product.images[0]);
    } else {
      setIsValidImage(false);
    }
  }, [product.images]);

  const handleLike = () => {
    // 여기에 좋아요 처리 로직을 구현하세요
    console.log(`상품 ${product.id} 좋아요 토글`);
  };

  return (
    <section className="flex flex-col gap-4 md:flex-row lg:gap-6">
      <div className="w-full md:w-2/5 md:max-w-[486px]">
        <Image
          src={isValidImage ? product.images[0] : NoImage}
          alt={`${product.name} 상품 대표 사진`}
          width={486}
          height={486}
          className="rounded-xl w-full h-auto"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 items-start">
        <div className="w-full relative">
          <button className="absolute right-0">
            <SeeMoreIcon />
          </button>

          <div>
            <h1 className="text-base font-semibold mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">
              {product.name}
            </h1>
            <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
              {product.price.toLocaleString()}원
            </h2>
          </div>

          <hr className="my-4 border-gray-200" />

          <div>
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              상품 소개
            </h3>
            <p className="text-base leading-[140%]">{product.description}</p>
          </div>

          <div className="my-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              상품 태그
            </h3>
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
