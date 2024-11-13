// src/components/UI/community/ArticleDetailSection.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import LikeButton from "./LikeButton";
import AlertModal from "../modal/AlertModal";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { useArticle } from "@/hooks/useArticle";

const KEBAB_ICON = "/images/icons/ic_kebab.png";
const NO_IMAGE = "/images/ui/no-image.png";
const DEFAULT_AVATAR = "/images/ui/ic_profile-24.png";

interface ArticleDetailSectionProps {
  articleId: number;
}

const ArticleDetailSection = ({ articleId }: ArticleDetailSectionProps) => {
  const [imageHeight, setImageHeight] = useState(486);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(NO_IMAGE);
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { useArticleDetail, addLike, removeLike, isLoading } = useArticle();
  const { data: articleDetail } = useArticleDetail(articleId);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [user] = useAtom(userAtom);

  // 초기 좋아요 상태 설정
  useEffect(() => {
    if (articleDetail) {
      setIsLiked(articleDetail.isLiked);
      setLikeCount(articleDetail.likeCount);
    }
  }, [articleDetail]);

  const handleLikeCallback = useCallback(async () => {
    if (!user) {
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    if (!articleDetail) return;

    const newIsLiked = !isLiked;

    // 낙관적 UI 업데이트
    setIsLiked(newIsLiked);
    setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));

    try {
      if (!newIsLiked) {
        await removeLike(articleDetail.id);
      } else {
        await addLike(articleDetail.id);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생: ", (error as Error).message);
      // 에러 발생 시 UI를 원래 상태로 되돌림
      setIsLiked(!newIsLiked);
      setLikeCount((prev) => (newIsLiked ? prev - 1 : prev + 1));
      setAlertMessage("좋아요 처리 중 오류가 발생했습니다!");
      setIsAlertOpen(true);
    }
  }, [articleDetail, isLiked, user, addLike, removeLike]);

  const debouncedHandleLike = useDebouncedCallback(handleLikeCallback, 300);

  const isSvgFile = (url: string) => url.toLowerCase().endsWith(".svg");

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.clientHeight);
    }
  };

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

    if (articleDetail?.image) {
      validateImageUrl(articleDetail.image);
    } else {
      setImageStatus("error");
    }
  }, [articleDetail?.image]);

  // articleDetail이 없는 경우 로딩 상태 표시
  if (!articleDetail) {
    return <div>로딩 중...</div>;
  }

  const formattedDate = format(new Date(articleDetail.createdAt), "yyyy. MM. dd", { locale: ko });

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
            <Image src={NO_IMAGE} alt="이미지 없음" width={486} height={486} className="rounded-xl w-full h-auto" />
          )}
        </div>

        <div className="flex flex-col justify-between flex-1" style={{ height: imageHeight }}>
          <div className="w-full relative">
            <button className="absolute right-0">
              <Image src={KEBAB_ICON} width={24} height={24} alt="케밥 이미지 버튼" className="w-6 h-6" />
            </button>

            <div>
              <div className="text-base font-semibold mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">
                {articleDetail.title}
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="overflow-auto" style={{ minHeight: imageHeight - 90 }}>
              <div className="text-gray-600 text-sm font-medium mb-2">게시글 내용</div>
              <p className="text-base leading-[140%] mb-4">{articleDetail.content}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
              <Image src={DEFAULT_AVATAR} alt="작성자 아바타" width={24} height={24} className="rounded-full" />
              <div className="font-semibold">{articleDetail.writer.nickname}</div>
              <div>{formattedDate}</div>
              <div className="h-4 border-l border-gray-300 mx-2"></div>

              <div className="flex items-center">
                <LikeButton
                  isLiked={isLiked}
                  likeCount={likeCount}
                  onLike={debouncedHandleLike}
                  isLoading={isLoading.addLike || isLoading.removeLike}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AlertModal 컴포넌트 */}
      <AlertModal isOpen={isAlertOpen} message={alertMessage} onClose={handleCloseAlert} />
    </>
  );
};

export default ArticleDetailSection;
