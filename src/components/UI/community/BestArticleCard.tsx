// src/components/UI/articles/BestArticleCard.tsx
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@/types/article";
import LikeCountDisplay from "@/components/UI/LikeCountDisplay";
import { isValidImageUrl } from "@/utils/imageUtils"; // 확장자 체크 함수

// public 폴더 경로 문자열로 대체
const MEDAL_ICON = "/images/icons/ic_medal.png";
const NO_IMAGE = "/images/ui/no-image.png";

interface BestArticleCardProps {
  article: Article;
  width?: number;
  height?: number;
  onLoad?: () => void; // 이미지 로드 완료 시 실행되는 콜백 함수
  priority?: boolean; // 중요 이미지에 우선 로딩 적용
}

const BestArticleCard = ({
  article,
  width = 384,
  height = 169,
  onLoad,
  priority = true, // 기본값: true
}: BestArticleCardProps) => {
  const dateString = format(article.createdAt, "yyyy. MM. dd");
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  // 이미지 URL 및 GIF 여부를 판단하기 위한 로직
  const imageInfo = useMemo(() => {
    if (isValidImageUrl(article.image)) {
      const isGif = article.image.toLowerCase().endsWith(".gif");
      return {
        // GIF 파일은 원본 URL 사용
        url: isGif
          ? article.image
          : `/api/imageProxy?url=${encodeURIComponent(
              article.image
            )}&width=72&height=72`,
        isGif,
      };
    }
    return {
      url: NO_IMAGE,
      isGif: false,
    };
  }, [article.image]);

  useEffect(() => {
    setImageStatus("loading");
  }, [article.image]);

  const handleImageLoad = () => {
    setImageStatus("loaded");
    if (onLoad) onLoad(); // 이미지 로드 시 콜백 함수 실행
  };

  const handleImageError = () => {
    setImageStatus("error");
    console.error(`이미지 로드 실패: ${imageInfo.url}`);
  };

  return (
    <Link
      href={`/community/${article.id}`}
      className="bg-gray-50 rounded-lg block"
    >
      <div>
        <Image
          src={MEDAL_ICON}
          width={102}
          height={30}
          alt="베스트 메달 아이콘"
          className="mx-6"
        />
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex gap-2 min-h-[72px]">
          <div className="text-lg font-semibold flex-1">{article.title}</div>
          <div className="bg-white border border-gray-200 w-[72px] h-[72px] rounded-lg p-1">
            <div className="relative w-full h-full">
              {imageStatus === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
              )}

              {imageInfo.isGif ? (
                // GIF 파일에 대한 처리: img 태그 사용 (원본 URL 사용)
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageStatus === "error" ? NO_IMAGE : imageInfo.url}
                  alt={`${article.id}번 게시글 이미지`}
                  style={{ objectFit: "contain" }}
                  width={width}
                  height={height}
                  onLoad={handleImageLoad} // 이미지 로드 시 콜백 함수 호출
                  onError={handleImageError}
                />
              ) : (
                // GIF가 아닌 경우 Next.js Image 컴포넌트 사용
                <Image
                  src={imageStatus === "error" ? NO_IMAGE : imageInfo.url}
                  alt={`${article.id}번 게시글 이미지`}
                  style={{ objectFit: "contain" }}
                  width={width}
                  height={height}
                  onLoad={handleImageLoad} // 이미지 로드 시 콜백 함수 호출
                  onError={handleImageError}
                  priority={priority} // 기본적으로 priority 적용
                  unoptimized={false} // GIF가 아닌 파일에는 unoptimized 설정 해제
                />
              )}
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
