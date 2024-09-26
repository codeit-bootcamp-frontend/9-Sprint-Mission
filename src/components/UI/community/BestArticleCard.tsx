// src/components/UI/articles/BestArticleCard.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@/types/article";
import MedalIcon from "@/images/icons/ic_medal.svg";
import LikeCountDisplay from "@/components/UI/LikeCountDisplay";
import NoImage from "@/images/ui/no-image.png"; // 대체 이미지

interface BestArticleCardProps {
  article: Article;
}

const BestArticleCard = ({ article }: BestArticleCardProps) => {
  const dateString = format(article.createdAt, "yyyy. MM. dd");
  const [imageUrl, setImageUrl] = useState<string>(NoImage.src);
  const [imageError, setImageError] = useState(false);

  // 이미지 유효성 검증 추가
  useEffect(() => {
    const validateAndSetImageUrl = async () => {
      if (article.image) {
        try {
          const response = await fetch(article.image, { method: "HEAD" });
          if (
            response.ok &&
            response.headers.get("Content-Type")?.startsWith("image/")
          ) {
            setImageUrl(article.image);
          } else {
            setImageError(true);
          }
        } catch (error) {
          console.error("이미지 로드 실패:", error);
          setImageError(true);
        }
      }
    };

    validateAndSetImageUrl();
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
          {article.image && !imageError && (
            <div className="bg-white border border-gray-200 w-[72px] h-[72px] rounded-lg p-3">
              <div className="relative w-full h-full">
                <Image
                  fill
                  src={imageUrl}
                  alt={`${article.id}번 게시글 이미지`}
                  style={{ objectFit: "contain" }}
                  onError={() => setImageError(true)} // 이미지 로드 실패 시 에러 처리
                />
              </div>
            </div>
          )}
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
