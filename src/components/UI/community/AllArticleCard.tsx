import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@/types/article";
import LikeCountDisplay from "@/components/UI/LikeCountDisplay";
import NoImage from "@/images/ui/no-image.png";
import allowedDomains from "allowedDomains";

// 캐시를 위한 객체 추가
const validImageCache: { [url: string]: boolean } = {};

// 이미지를 사전에 검증하는 함수
const isValidImageUrl = async (url: string): Promise<boolean> => {
  if (url in validImageCache) {
    return validImageCache[url];
  }

  try {
    const urlObj = new URL(url);
    if (allowedDomains.includes(urlObj.hostname)) {
      validImageCache[url] = true;
      return true;
    }

    const response = await fetch(url, { method: "HEAD" });
    const isValid =
      (response.ok &&
        response.headers.get("Content-Type")?.startsWith("image/")) ||
      false;
    validImageCache[url] = isValid;
    return isValid;
  } catch (error) {
    console.error("이미지 검증 중 오류 발생:", url, error);
    validImageCache[url] = false;
    return false;
  }
};

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  const dateString = format(article.createdAt, "yyyy. MM. dd");
  const [imageUrl, setImageUrl] = useState<string>(NoImage.src);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isFirstRender = useRef(true); // 첫 렌더링 추적

  useEffect(() => {
    if (!isFirstRender.current) {
      setImageLoaded(false);
      setImageError(false); // 이미지 변경 시 에러 상태 초기화
    }
  }, [article.image]);

  useEffect(() => {
    const controller = new AbortController(); // AbortController 추가

    const validateAndSetImageUrl = async () => {
      if (article.image) {
        const isValid = await isValidImageUrl(article.image);
        if (isValid) {
          setImageUrl(article.image);
        } else {
          console.warn("유효하지 않은 이미지 URL:", article.image);
          setImageUrl(NoImage.src); // 대체 이미지 설정
          setImageError(true); // 에러 상태로 설정
        }
      } else {
        setImageUrl(NoImage.src); // 이미지가 없는 경우 기본 이미지 설정
        setImageError(true);
      }
      isFirstRender.current = false;
    };

    validateAndSetImageUrl();

    // 컴포넌트 언마운트 시 요청 취소
    return () => {
      controller.abort();
    };
  }, [article.image]);

  return (
    <>
      <Link href={`/boards/${article.id}`} className="block">
        <div className="flex gap-2 min-h-[72px]">
          <div className="text-lg font-semibold flex-1 md:text-xl">
            {article.title}
          </div>
          {imageUrl && (
            <div className="bg-white border border-gray-200 w-[72px] h-[72px] rounded-lg p-3">
              <div className="relative w-full h-full">
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
                  </div>
                )}

                <Image
                  fill
                  src={imageUrl}
                  alt={`${article.id}번 게시글 이미지`}
                  style={{ objectFit: "contain" }}
                  onLoad={() => {
                    setImageLoaded(true);
                  }}
                  onError={() => {
                    setImageError(true);
                    setImageUrl(NoImage.src);
                    setImageLoaded(true);
                  }}
                />
              </div>
            </div>
          )}
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
