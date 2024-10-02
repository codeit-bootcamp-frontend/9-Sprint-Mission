// src/components/UI/community/ArticleDetailSection.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SeeMoreIcon from "@/images/icons/ic_kebab.svg";
import NoImage from "@/images/ui/no-image.png";
import { Article as ArticleDetail } from "@/types/article";

interface ArticleDetailSectionProps {
  articleDetail: ArticleDetail;
}

const ArticleDetailSection = ({ articleDetail }: ArticleDetailSectionProps) => {
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

    if (articleDetail.image) {
      validateImageUrl(articleDetail.image);
    } else {
      setImageStatus("error");
    }
  }, [articleDetail.image]);
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
              alt={`${articleDetail.title} 게시글 대표 사진`}
              className="rounded-xl w-full h-auto"
              width={486}
              height={486}
            />
          ) : (
            <Image
              src={imageUrl}
              alt={`${articleDetail.title} 게시글 대표 사진`}
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
              {articleDetail.title}
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <div>
            <div className="text-gray-600 text-sm font-medium mb-2">
              게시글 내용
            </div>
            <p className="text-base leading-[140%]">{articleDetail.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetailSection;
