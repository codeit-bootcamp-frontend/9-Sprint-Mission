// src/components/UI/community/ArticleDetailSection.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import useDebouncedCallback from "@/hooks/useDebouncedCallback"; // 디바운스된 콜백 훅 임포트
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

// 컴포넌트에 전달되는 props의 타입 정의
interface ArticleDetailSectionProps {
  articleDetail: ArticleDetail;
}

// 좋아요 기능을 처리하는 함수 정의
const handleLike = async (
  token: string | null,
  articleId: number,
  isLiked: boolean,
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>,
  setLikeCount: React.Dispatch<React.SetStateAction<number>>,
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>,
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!token) {
    setAlertMessage("로그인이 필요합니다.");
    setIsAlertOpen(true);
    return;
  }

  try {
    if (isLiked) {
      // 이미 좋아요를 누른 상태이면 좋아요 취소 API 호출
      await removeArticleLike(articleId, token);
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      // 좋아요를 누르지 않은 상태이면 좋아요 추가 API 호출
      await addArticleLike(articleId, token);
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  } catch (error) {
    console.error("오류: ", (error as Error).message);
    setAlertMessage("좋아요 처리 중 오류가 발생했습니다!");
    setIsAlertOpen(true);
  }
};

// 게시글 상세 컴포넌트 정의
const ArticleDetailSection = ({ articleDetail }: ArticleDetailSectionProps) => {
  const [imageHeight, setImageHeight] = useState(486); // 이미지 높이 상태
  const imageRef = useRef<HTMLImageElement | null>(null); // 이미지 요소에 대한 ref
  const [imageUrl, setImageUrl] = useState<string>(NO_IMAGE); // 이미지 URL 상태
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading"); // 이미지 로딩 상태
  const [token, setToken] = useState<string | null>(null); // 토큰 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false); // 알림 모달 열림 상태
  const [alertMessage, setAlertMessage] = useState(""); // 알림 메시지 상태
  const [isLiked, setIsLiked] = useState<boolean>(articleDetail.isLiked); // 좋아요 상태
  const [likeCount, setLikeCount] = useState<number>(articleDetail.likeCount); // 좋아요 개수 상태

  // URL이 SVG 파일인지 확인하는 함수
  const isSvgFile = (url: string) => url.toLowerCase().endsWith(".svg");

  // 좋아요 기능을 디바운스하여 처리하기 위한 콜백 함수
  const handleLikeCallback = useCallback(() => {
    handleLike(
      token,
      articleDetail.id,
      isLiked,
      setIsLiked,
      setLikeCount,
      setAlertMessage,
      setIsAlertOpen
    );
  }, [token, articleDetail.id, isLiked]);

  // 디바운스된 좋아요 함수 생성
  const debouncedHandleLike = useDebouncedCallback(handleLikeCallback, 300);

  // 컴포넌트 마운트 시 토큰을 쿠키에서 가져옴
  useEffect(() => {
    const accessToken = getCookie("accessToken");
    setToken(accessToken || null);
  }, []);

  // 이미지 URL을 검증하고 로딩 상태를 업데이트하는 효과
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

  // 이미지 로드 후 높이 값을 상태에 저장
  const handleImageLoad = () => {
    if (imageRef.current) {
      const height = imageRef.current.clientHeight;
      setImageHeight(height);
      console.log("Loaded image height: ", height);
    }
  };

  // 날짜를 포맷팅하여 표시
  const formattedDate = format(
    new Date(articleDetail.createdAt),
    "yyyy. MM. dd",
    { locale: ko }
  );

  // 알림 모달 닫기 함수
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <section className="flex flex-col gap-4 md:flex-row lg:gap-6">
        {/* 이미지 영역 */}
        <div className="w-full md:w-2/5 md:max-w-[486px]">
          {imageStatus === "loading" ? (
            // 로딩 중일 때 로딩 스피너 표시
            <div className="w-full h-[486px] flex items-center justify-center bg-gray-200 rounded-xl">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          ) : imageStatus === "loaded" && imageUrl ? (
            // 이미지 로드 완료 시 이미지 표시
            <img
              ref={imageRef}
              src={imageUrl}
              alt={`${articleDetail.title} 게시글 대표 사진`}
              className="rounded-xl w-full h-auto"
              style={{ maxHeight: "486px" }}
              onLoad={handleImageLoad}
            />
          ) : (
            // 이미지 로드 실패 시 기본 이미지 표시
            <Image
              src={NO_IMAGE}
              alt="이미지 없음"
              width={486}
              height={486}
              className="rounded-xl w-full h-auto"
            />
          )}
        </div>

        {/* 게시글 내용 영역 */}
        <div
          className="flex flex-col justify-between flex-1"
          style={{ height: imageHeight }}
        >
          <div className="w-full relative">
            {/* 옵션 버튼 */}
            <button className="absolute right-0">
              <Image
                src={KEBAB_ICON}
                width={24}
                height={24}
                alt="케밥 이미지 버튼"
                className="w-6 h-6"
              />
            </button>

            {/* 게시글 제목 */}
            <div>
              <div className="text-base font-semibold mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">
                {articleDetail.title}
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* 게시글 내용 */}
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

            {/* 작성자 정보 및 좋아요 버튼 */}
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

              {/* 좋아요 버튼 */}
              <div className="flex items-center">
                <LikeButton
                  isLiked={isLiked}
                  likeCount={likeCount}
                  onLike={debouncedHandleLike} // 디바운스된 좋아요 함수 전달
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 알림 모달 */}
      {isAlertOpen && (
        <AlertModal message={alertMessage} onClose={handleCloseAlert} />
      )}
    </>
  );
};

export default ArticleDetailSection;
