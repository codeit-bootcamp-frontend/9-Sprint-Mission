// src/components/UI/community/ArticleDetailSection.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Article as ArticleDetail } from "@/types/article";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

// public 폴더 경로 문자열로 대체
const KebabIcon = "/images/icons/ic_kebab.png";
const NoImage = "/images/ui/no-image.png";
const DefaultAvatar = "/images/ui/ic_profile-24.png"; // 기본 아바타 이미지
const HeartIcon = "/images/icons/ic_heart.png"; // 하트 이미지

interface ArticleDetailSectionProps {
  articleDetail: ArticleDetail;
}

const ArticleDetailSection = ({ articleDetail }: ArticleDetailSectionProps) => {
  const [imageUrl, setImageUrl] = useState<string>(NoImage);
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

  // Date formatting function
  const formattedDate = format(
    new Date(articleDetail.createdAt),
    "yyyy. MM. dd",
    {
      locale: ko,
    }
  );

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

      {/* 작성자 정보 섹션 */}
      <div className="flex flex-col justify-between flex-1">
        <div className="w-full relative">
          <button className="absolute right-0">
            <Image
              src={KebabIcon}
              width={24}
              height={24}
              alt="케밥 이미지 버튼"
              className="w-6 h-6"
            />
          </button>

          <div>
            <div className="text-base font-semibold mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">
              {articleDetail.title}
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="min-h-60 max-h-96">
            <div className="text-gray-600 text-sm font-medium mb-2">
              게시글 내용
            </div>
            <p className="text-base leading-[140%] mb-4">
              {articleDetail.content}
            </p>
          </div>

          {/* 작성자 정보: 아래에 고정된 부분 */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto flex-grow">
            {/* 기본 아바타 이미지 */}
            <Image
              src={DefaultAvatar}
              alt="작성자 아바타"
              width={24}
              height={24}
              className="rounded-full"
            />

            {/* 작성자 닉네임 */}
            <div className="font-semibold">{articleDetail.writer.nickname}</div>

            <div>{formattedDate}</div>

            {/* 세로 구분선 */}
            <div className="h-4 border-l border-gray-300 mx-2"></div>

            {/* 좋아요 하트 버튼 */}
            <button className="flex items-center">
              <Image
                src={HeartIcon}
                width={16}
                height={16}
                alt="좋아요 하트 버튼"
              />
              <span className="ml-1">{articleDetail.likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetailSection;
