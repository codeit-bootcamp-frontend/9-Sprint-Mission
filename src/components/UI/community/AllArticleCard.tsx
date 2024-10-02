// src/components/UI/community/AllArticleCard.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@/types/article";
import LikeCountDisplay from "@/components/UI/LikeCountDisplay";
import NoImage from "@/images/ui/no-image.png";
import { isValidImageUrl } from "@/utils/imageUtils"; // 확장자 체크 함수

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  const dateString = format(article.createdAt, "yyyy. MM. dd");
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  // 이미지 확장자가 허용된 파일인지 확인
  const isImageAllowed = article.image && isValidImageUrl(article.image);

  // imageProxy 적용: 유효한 이미지일 경우 프록시 서버를 통해 이미지를 로드
  const imageUrl = isImageAllowed
    ? `/api/imageProxy?url=${encodeURIComponent(article.image)}`
    : NoImage.src;

  useEffect(() => {
    setImageStatus("loading");
  }, [article.image]);

  return (
    <>
      <Link href={`/community/${article.id}`} className="block">
        <div className="flex gap-2 min-h-[72px]">
          <div className="text-lg font-semibold flex-1 md:text-xl">
            {article.title}
          </div>
          <div className="bg-white border border-gray-200 w-[72px] h-[72px] rounded-lg p-1">
            <div className="relative w-full h-full">
              {imageStatus === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                fill
                sizes="(max-width: 768px) 72px, 72px"
                src={imageUrl}
                alt={`${article.id}번 게시글 이미지`}
                style={{ objectFit: "contain" }}
                onLoad={() => setImageStatus("loaded")}
                onError={() => setImageStatus("error")}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            {article.writer.nickname}{" "}
            <span className="text-gray-400">{dateString}</span>
          </div>

          <LikeCountDisplay count={article.likeCount} iconWidth={24} gap={8} />
        </div>
      </Link>

      <hr className="my-6 border-t border-gray-200" />
    </>
  );
};

export default ArticleItem;
