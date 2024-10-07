// src/components/UI/item/ItemDetailSection.tsx
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import TagDisplay from "./TagDisplay";
import FavoriteButton from "./FavoriteButton";
import useDebouncedCallback from "@/hooks/useDebouncedCallback"; // useDebouncedCallback 훅 임포트
import { ProductDetail } from "@/types/product";
import { addProductFavorite, removeProductFavorite } from "@/api/product";
import AlertModal from "../modal/AlertModal"; // AlertModal 임포트
import { getCookie } from "@/utils/cookie";

// public 폴더 경로 문자열로 대체
const KEBAB_ICON = "/images/icons/ic_kebab.png";
const NO_IMAGE = "/images/ui/no-image.png";
const DEFAULT_AVATAR = "/images/ui/ic_profile-24.png";

interface ItemDetailSectionProps {
  productDetail: ProductDetail;
}

const ItemDetailSection = ({ productDetail }: ItemDetailSectionProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 URL 상태
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading"); // 이미지 로딩 상태
  const [token, setToken] = useState<string | null>(null); // 쿠키에서 가져온 토큰 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false); // AlertModal 상태
  const [alertMessage, setAlertMessage] = useState(""); // AlertModal 메시지 상태
  const [isFavorite, setIsFavorite] = useState<boolean>(
    productDetail.isFavorite
  ); // 좋아요 상태
  const [favoriteCount, setFavoriteCount] = useState<number>(
    productDetail.favoriteCount
  ); // 좋아요 수

  // URL이 SVG 파일인지 확인하는 함수
  const isSvgFile = (url: string) => url.toLowerCase().endsWith(".svg");

  // 컴포넌트 마운트 시 쿠키에서 accessToken 가져오기
  useEffect(() => {
    const accessToken = getCookie("accessToken"); // 쿠키에서 accessToken 가져옴
    setToken(accessToken || null); // 토큰이 있으면 상태에 저장
  }, []);

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 마운트된 상태인지 확인하기 위한 변수

    const loadImage = () => {
      if (!productDetail.images[0]) {
        // 이미지가 없는 경우
        if (isMounted) {
          setImageStatus("error");
        }
        return;
      }

      const originalUrl = productDetail.images[0];
      if (isSvgFile(originalUrl)) {
        // SVG 파일인 경우 원본 URL 사용
        if (isMounted) {
          setImageUrl(originalUrl);
          setImageStatus("loaded");
        }
      } else {
        // 기타 이미지인 경우 프록시 URL 사용
        const proxyUrl = `/api/imageProxy?url=${encodeURIComponent(
          originalUrl
        )}`;
        if (isMounted) {
          setImageUrl(proxyUrl);
          setImageStatus("loaded");
        }
      }
    };

    // 이미지 로딩 상태를 "loading"으로 설정하고 이미지 로드 시작
    setImageStatus("loading");
    loadImage();

    // 컴포넌트 언마운트 시 isMounted를 false로 설정하여 메모리 누수 방지
    return () => {
      isMounted = false;
    };
  }, [productDetail.images]);

  // 좋아요 처리를 위한 함수 정의
  const handleFavorite = useCallback(async () => {
    if (!token) {
      // 토큰이 없을 경우 AlertModal 띄우기
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    const productId = productDetail.id;
    try {
      if (isFavorite) {
        await removeProductFavorite(productId, token);
        setIsFavorite(false);
        setFavoriteCount((prev) => prev - 1);
      } else {
        await addProductFavorite(productId, token);
        setIsFavorite(true);
        setFavoriteCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생: ", (error as Error).message);
      setAlertMessage("좋아요 처리 중 오류가 발생했습니다!");
      setIsAlertOpen(true); // 실패 메시지 모달 띄우기
    }
  }, [
    token,
    productDetail.id,
    isFavorite,
    setIsFavorite,
    setFavoriteCount,
    setAlertMessage,
    setIsAlertOpen,
  ]);

  // useDebouncedCallback 훅을 사용하여 함수 디바운싱
  const debouncedHandleFavorite = useDebouncedCallback(handleFavorite, 300);

  // AlertModal 닫기
  const handleCloseAlert = () => {
    setIsAlertOpen(false); // 모달 닫기
  };

  return (
    <>
      <section className="flex flex-col gap-4 md:flex-row lg:gap-6">
        {/* 이미지 영역 */}
        <div className="w-full md:w-2/5 md:max-w-[486px]">
          {imageStatus === "loading" ? (
            // 로딩 중일 때 스피너 표시
            <div className="w-full h-[486px] flex items-center justify-center bg-gray-200 rounded-xl">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          ) : imageStatus === "loaded" && imageUrl ? (
            isSvgFile(imageUrl) ? (
              // SVG 파일은 img 태그로 렌더링
              <img
                src={imageUrl}
                alt={`${productDetail.name} 상품 대표 사진`}
                className="rounded-xl w-full h-auto"
                width={486}
                height={486}
              />
            ) : (
              // 그 외의 이미지는 Next.js Image 컴포넌트 사용
              <Image
                src={imageUrl}
                alt={`${productDetail.name} 상품 대표 사진`}
                width={486}
                height={486}
                className="rounded-xl w-full h-auto"
                unoptimized={true}
                onError={() => setImageStatus("error")} // 이미지 로드 실패 시 상태 변경
              />
            )
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

        {/* 상품 정보 및 좋아요 버튼 */}
        <div className="flex flex-col justify-between flex-1 items-start">
          <div className="w-full relative">
            {/* 더보기 버튼 */}
            <button className="absolute right-0">
              <Image
                src={KEBAB_ICON}
                width={24}
                height={24}
                alt="케밥 이미지 버튼"
                className="w-6 h-6"
              />
            </button>

            {/* 상품 이름 및 가격 */}
            <div>
              <div className="text-base font-semibold mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">
                {productDetail.name}
              </div>
              <div className="text-2xl font-semibold md:text-3xl lg:text-4xl">
                {productDetail.price.toLocaleString()}원
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* 상품 소개 */}
            <div>
              <div className="text-gray-600 text-sm font-medium mb-2">
                상품 소개
              </div>
              <p className="text-base leading-[140%]">
                {productDetail.description}
              </p>
            </div>

            {/* 상품 태그 */}
            <div className="my-6">
              <div className="text-gray-600 text-sm font-medium mb-2">
                상품 태그
              </div>
              <TagDisplay tags={productDetail.tags} />
            </div>
          </div>

          {/* 소유자 정보 및 좋아요 버튼 */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
            <Image
              src={DEFAULT_AVATAR}
              alt="작성자 아바타"
              width={24}
              height={24}
              className="rounded-full"
            />
            <div className="font-semibold">
              {productDetail.ownerNickname || "Unknown"}
            </div>

            {/* 구분선 */}
            <div className="h-4 border-l border-gray-300 mx-2"></div>

            {/* 좋아요 버튼 */}
            <div className="flex items-center">
              <FavoriteButton
                isFavorite={isFavorite}
                favoriteCount={favoriteCount}
                onFavorite={debouncedHandleFavorite} // 디바운스된 함수 전달
              />
            </div>
          </div>
        </div>
      </section>
      {/* AlertModal 컴포넌트 */}
      {isAlertOpen && (
        <AlertModal message={alertMessage} onClose={handleCloseAlert} />
      )}
    </>
  );
};

export default ItemDetailSection;
