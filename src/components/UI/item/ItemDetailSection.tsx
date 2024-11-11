// src/components/UI/item/ItemDetailSection.tsx
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import TagDisplay from "./TagDisplay";
import FavoriteButton from "./FavoriteButton";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { ProductDetail } from "@/types/product";
import AlertModal from "../modal/AlertModal";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { useProduct } from "@/hooks/useProduct";

const KEBAB_ICON = "/images/icons/ic_kebab.png";
const NO_IMAGE = "/images/ui/no-image.png";
const DEFAULT_AVATAR = "/images/ui/ic_profile-24.png";

interface ItemDetailSectionProps {
  productDetail: ProductDetail;
}

const ItemDetailSection = ({ productDetail }: ItemDetailSectionProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState<boolean>(productDetail.isFavorite);
  const [favoriteCount, setFavoriteCount] = useState<number>(productDetail.favoriteCount);
  const [user] = useAtom(userAtom);

  const { addFavorite, removeFavorite, isLoading } = useProduct();

  const isSvgFile = (url: string) => url.toLowerCase().endsWith(".svg");

  useEffect(() => {
    let isMounted = true;

    const loadImage = () => {
      if (!productDetail.images[0]) {
        if (isMounted) {
          setImageStatus("error");
        }
        return;
      }

      const originalUrl = productDetail.images[0];
      if (isSvgFile(originalUrl)) {
        if (isMounted) {
          setImageUrl(originalUrl);
          setImageStatus("loaded");
        }
      } else {
        const proxyUrl = `/api/imageProxy?url=${encodeURIComponent(originalUrl)}`;
        if (isMounted) {
          setImageUrl(proxyUrl);
          setImageStatus("loaded");
        }
      }
    };

    setImageStatus("loading");
    loadImage();

    return () => {
      isMounted = false;
    };
  }, [productDetail.images]);

  const handleFavorite = useCallback(async () => {
    if (!user) {
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    // 낙관적 UI 업데이트
    setIsFavorite((prev) => !prev);
    setFavoriteCount((prev) => (isFavorite ? prev - 1 : prev + 1));

    try {
      if (isFavorite) {
        await removeFavorite(productDetail.id);
      } else {
        await addFavorite(productDetail.id);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생: ", (error as Error).message);
      // 에러 발생 시 UI를 원래 상태로 되돌림
      setIsFavorite((prev) => !prev);
      setFavoriteCount((prev) => (isFavorite ? prev + 1 : prev - 1));
      setAlertMessage("좋아요 처리 중 오류가 발생했습니다!");
      setIsAlertOpen(true);
    }
  }, [productDetail.id, isFavorite, user, addFavorite, removeFavorite]);

  const debouncedHandleFavorite = useDebouncedCallback(handleFavorite, 300);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
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
              // eslint-disable-next-line @next/next/no-img-element
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
            <Image src={NO_IMAGE} alt="이미지 없음" width={486} height={486} className="rounded-xl w-full h-auto" />
          )}
        </div>

        {/* 상품 정보 및 좋아요 버튼 */}
        <div className="flex flex-col justify-between flex-1 items-start">
          <div className="w-full relative">
            {/* 더보기 버튼 */}
            <button className="absolute right-0">
              <Image src={KEBAB_ICON} width={24} height={24} alt="케밥 이미지 버튼" className="w-6 h-6" />
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
              <div className="text-gray-600 text-sm font-medium mb-2">상품 소개</div>
              <p className="text-base leading-[140%]">{productDetail.description}</p>
            </div>

            {/* 상품 태그 */}
            <div className="my-6">
              <div className="text-gray-600 text-sm font-medium mb-2">상품 태그</div>
              <TagDisplay tags={productDetail.tags} />
            </div>
          </div>

          {/* 소유자 정보 및 좋아요 버튼 */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
            <Image src={DEFAULT_AVATAR} alt="작성자 아바타" width={24} height={24} className="rounded-full" />
            <div className="font-semibold">{productDetail.ownerNickname || "Unknown"}</div>

            {/* 구분선 */}
            <div className="h-4 border-l border-gray-300 mx-2"></div>

            {/* 좋아요 버튼 */}
            <div className="flex items-center">
              <FavoriteButton
                isFavorite={isFavorite}
                favoriteCount={favoriteCount}
                onFavorite={debouncedHandleFavorite}
                isLoading={isLoading.addFavorite || isLoading.removeFavorite}
              />
            </div>
          </div>
        </div>
      </section>

      {/* AlertModal 컴포넌트 */}
      <AlertModal isOpen={isAlertOpen} message={alertMessage} onClose={handleCloseAlert} />
    </>
  );
};

export default ItemDetailSection;
