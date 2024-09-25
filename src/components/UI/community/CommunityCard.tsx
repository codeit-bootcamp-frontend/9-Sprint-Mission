// src/components/UI/community/CommunityCard.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeartIcon from "@/images/icons/ic_heart.svg";
import NoImage from "@/images/ui/no-image.png";
import { Article } from "@/types/article";

interface CommunityCardProps {
  article: Article;
  width?: number;
  height?: number;
}

const CommunityCard = ({ article, width, height }: CommunityCardProps) => {
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

    if (article.image) {
      validateAndSetImageUrl(article.image);
    } else {
      setImageUrl(NoImage.src);
    }
  }, [article.image]);

  return (
    <Link
      href={`/articles/${article.id}`}
      className="block text-gray-800 overflow-hidden cursor-pointer"
    >
      <div className="w-full pb-[100%] relative mb-4">
        <Image
          src={imageUrl}
          alt="게시글 썸네일"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
          width={width}
          height={height}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h2 className="text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">
          {article.title}
        </h2>
        <div className="flex items-center gap-1 text-gray-600 text-xs">
          <HeartIcon />
          <span>{article.likeCount}</span>
        </div>
        <div>
          <span>{article.updatedAt.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
