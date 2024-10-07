// src/components/UI/community/AllArticleCard.tsx
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@/types/article";
import LikeCountDisplay from "@/components/UI/LikeCountDisplay";
import { isValidImageUrl } from "@/utils/imageUtils"; // 확장자 체크 함수
import { detectLCP } from "@/utils/detectLPC"; // LCP 감지 함수

const NO_IMAGE = "/images/ui/no-image.png";

interface AllArticleCardProps {
  article: Article;
  currentPage: number; // 현재 페이지 번호
}

const AllArticleCard = ({ article, currentPage }: AllArticleCardProps) => {
  const dateString = format(article.createdAt, "yyyy. MM. dd");
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");
  const [lcpUrl, setLCPUrl] = useState<string | null>(null); // LCP 감지 이미지 URL

  // 이미지 확장자가 허용된 파일인지 확인
  const isImageAllowed = article.image && isValidImageUrl(article.image);

  // GIF 파일 여부 판단
  const imageInfo = useMemo(() => {
    if (isImageAllowed) {
      const isGif = article.image.toLowerCase().endsWith(".gif");
      return {
        // GIF 파일은 원본 URL을 사용
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
  }, [article.image, isImageAllowed]);

  useEffect(() => {
    setImageStatus("loading");
  }, [article.image]);

  // LCP 감지 함수 호출 (2페이지 이후에만 실행)
  useEffect(() => {
    if (currentPage > 1) {
      detectLCP(setLCPUrl); // LCP 감지 및 URL 업데이트
    }
  }, [currentPage]);

  // 1페이지는 모든 이미지에 priority, 2페이지부터는 LCP 감지
  const isPriority = currentPage === 1 ? true : lcpUrl === imageInfo.url;

  return (
    <Link href={`/community/${article.id}`} className="block">
      <div className="flex gap-4 items-center">
        {/* 제목 */}
        <div className="text-lg font-semibold flex-1 md:text-xl truncate">
          {article.title}
        </div>

        {/* 이미지 */}
        <div className="w-[80px] h-[80px] flex-shrink-0 rounded-lg overflow-hidden relative">
          {imageStatus === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          )}

          {imageInfo.isGif ? (
            // GIF 파일에 대한 처리: img 태그 사용 (원본 URL 사용)
            <img
              src={imageStatus === "error" ? NO_IMAGE : imageInfo.url}
              alt={`${article.id}번 게시글 이미지`}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              onLoad={() => setImageStatus("loaded")}
              onError={() => setImageStatus("error")}
              width={80}
              height={80}
            />
          ) : (
            // GIF가 아닌 경우 Next.js Image 컴포넌트 사용
            <Image
              src={imageStatus === "error" ? NO_IMAGE : imageInfo.url}
              alt={`${article.id}번 게시글 이미지`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // sizes 속성 추가
              style={{ objectFit: "cover" }} // 이미지 부모 크기에 맞춤
              onLoad={() => setImageStatus("loaded")}
              onError={() => setImageStatus("error")}
              priority={isPriority} // 1페이지는 true, 2페이지 이후는 LCP 감지 후 적용
              unoptimized={imageInfo.isGif} // GIF 파일에만 unoptimized 적용
            />
          )}
        </div>
      </div>

      {/* 작성자 정보 및 좋아요 */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          {article.writer.nickname}{" "}
          <span className="text-gray-400">{dateString}</span>
        </div>

        <LikeCountDisplay count={article.likeCount} iconWidth={24} gap={8} />
      </div>

      <hr className="my-6 border-t border-gray-200" />
    </Link>
  );
};

export default AllArticleCard;
