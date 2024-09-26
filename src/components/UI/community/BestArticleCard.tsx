// src/components/UI/articles/BestArticleCard.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@/types/article";
import MedalIcon from "@/images/icons/ic_medal.svg";
import LikeCountDisplay from "@/components/UI/LikeCountDisplay";
import NoImage from "@/images/ui/no-image.png";
import disallowedDomains from "disallowedDomains";

interface BestArticleCardProps {
  article: Article;
  width?: number;
  height?: number;
}

const BestArticleCard = ({
  article,
  width = 384,
  height = 169,
}: BestArticleCardProps) => {
  const dateString = format(article.createdAt, "yyyy. MM. dd");
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");
  const imageUrl =
    article.image && article.image.trim() !== ""
      ? disallowedDomains.some((domain) => article.image.includes(domain))
        ? NoImage.src
        : `/api/imageProxy?url=${encodeURIComponent(article.image)}`
      : NoImage.src;

  useEffect(() => {
    setImageStatus("loading");
    if (article.image && article.image.trim() !== "") {
      const checkImageUrl = async () => {
        try {
          const response = await fetch(
            `/api/imageProxy?url=${encodeURIComponent(article.image)}`,
            { method: "GET" }
          );
          if (response.ok) {
            setImageStatus("loaded");
          } else {
            setImageStatus("error");
          }
        } catch (error) {
          console.error("이미지 URL 검증 실패:", error);
          setImageStatus("error");
        }
      };
      checkImageUrl();
    } else {
      setImageStatus("error");
    }
  }, [article.image]);

  return (
    <Link
      href={`/community/${article.id}`}
      className="bg-gray-50 rounded-lg block"
    >
      <div className="inline-flex items-center bg-blue-500 text-white text-base font-semibold rounded-b-3xl px-6 py-2 ml-6 gap-1">
        <MedalIcon alt="베스트 게시글" />
        Best
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex gap-2 min-h-[72px]">
          <div className="text-lg font-semibold flex-1">{article.title}</div>
          <div className="bg-white border border-gray-200 w-[72px] h-[72px] rounded-lg p-3">
            <div className="relative w-full h-full">
              {imageStatus === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={imageStatus === "error" ? NoImage.src : imageUrl}
                alt={`${article.id}번 게시글 이미지`}
                style={{ objectFit: "contain" }}
                width={width}
                height={height}
                onLoad={() => setImageStatus("loaded")}
                onError={() => {
                  setImageStatus("error");
                  console.error(`이미지 로드 실패: ${imageUrl}`);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            {article.writer.nickname}
            <LikeCountDisplay count={article.likeCount} fontSize={14} />
          </div>
          <span className="text-sm text-gray-400">{dateString}</span>
        </div>
      </div>
    </Link>
  );
};

export default BestArticleCard;
