// src/components/UI/community/ArticleDetailSection.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { ArticleDetail } from "@/types/article";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { addArticleLike, removeArticleLike } from "@/api/article";
import LikeButton from "./LikeButton";
import AlertModal from "../modal/AlertModal";
import { getCookie } from "@/utils/cookie";

const KEBAB_ICON = "/images/icons/ic_kebab.png";
const NO_IMAGE = "/images/ui/no-image.png";
const DEFAULT_AVATAR = "/images/ui/ic_profile-24.png";

interface ArticleDetailSectionProps {
  articleDetail: ArticleDetail;
}

const ArticleDetailSection = ({ articleDetail }: ArticleDetailSectionProps) => {
  const [imageHeight, setImageHeight] = useState(486);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(NO_IMAGE);
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");
  const [token, setToken] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLiked, setIsLiked] = useState<boolean>(articleDetail.isLiked);
  const [likeCount, setLikeCount] = useState<number>(articleDetail.likeCount);

  const isSvgFile = (url: string) => url.toLowerCase().endsWith(".svg");

  const handleLikeCallback = useCallback(async () => {
    if (!token) {
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    // 낙관적 UI 업데이트
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      if (isLiked) {
        await removeArticleLike(articleDetail.id, token);
      } else {
        await addArticleLike(articleDetail.id, token);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생: ", (error as Error).message);
      // 에러 발생 시 UI를 원래 상태로 되돌림
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
      setAlertMessage("좋아요 처리 중 오류가 발생했습니다!");
      setIsAlertOpen(true);
    }
  }, [token, articleDetail.id, isLiked]);

  const debouncedHandleLike = useDebouncedCallback(handleLikeCallback, 300);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    setToken(accessToken || null);
  }, []);

  useEffect(() => {
    const validateImageUrl = async (url: string) => {
      try {
        if (isSvgFile(url)) {
          // SVG 파일이면 직접 사용
          setImageUrl(url);
          setImageStatus("loaded");
        } else {
          // 그 외의 경우 프록시를 통해 이미지 로드
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

  const handleImageLoad = () => {
    if (imageRef.current) {
      const height = imageRef.current.clientHeight;
      setImageHeight(height);
      console.log("Loaded image height: ", height);
    }
  };

  const formattedDate = format(
    new Date(articleDetail.createdAt),
    "yyyy. MM. dd",
    { locale: ko }
  );

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <section className="flex flex-col gap-4 md:flex-row lg:gap-6">
        <div className="w-full md:w-2/5 md:max-w-[486px]">
          {imageStatus === "loading" ? (
            <div className="w-full h-[486px] flex items-center justify-center bg-gray-200 rounded-xl">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          ) : imageStatus === "loaded" && imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imageRef}
              src={imageUrl}
              alt={`${articleDetail.title} 게시글 대표 사진`}
              className="rounded-xl w-full h-auto"
              style={{ maxHeight: "486px" }}
              onLoad={handleImageLoad}
            />
          ) : (
            <Image
              src={NO_IMAGE}
              alt="이미지 없음"
              width={486}
              height={486}
              className="rounded-xl w-full h-auto"
            />
          )}
        </div>

        <div
          className="flex flex-col justify-between flex-1"
          style={{ height: imageHeight }}
        >
          <div className="w-full relative">
            <button className="absolute right-0">
              <Image
                src={KEBAB_ICON}
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

            <div
              className="overflow-auto"
              style={{ minHeight: imageHeight - 90 }}
            >
              <div className="text-gray-600 text-sm font-medium mb-2">
                게시글 내용
              </div>
              <p className="text-base leading-[140%] mb-4">
                {articleDetail.content}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
              <Image
                src={DEFAULT_AVATAR}
                alt="작성자 아바타"
                width={24}
                height={24}
                className="rounded-full"
              />
              <div className="font-semibold">
                {articleDetail.writer.nickname}
              </div>
              <div>{formattedDate}</div>
              <div className="h-4 border-l border-gray-300 mx-2"></div>

              <div className="flex items-center">
                <LikeButton
                  isLiked={isLiked}
                  likeCount={likeCount}
                  onLike={debouncedHandleLike}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {isAlertOpen && (
        <AlertModal message={alertMessage} onClose={handleCloseAlert} />
      )}
    </>
  );
};

export default ArticleDetailSection;
