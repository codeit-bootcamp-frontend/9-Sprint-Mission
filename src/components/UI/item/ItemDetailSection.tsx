// src/components/UI/item/ItemDetailSection.tsx
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import TagDisplay from "./TagDisplay";
import FavoriteButton from "./FavoriteButton";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import AlertModal from "../modal/AlertModal";
import ConfirmModal from "../modal/ConfirmModal";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { useProduct } from "@/hooks/useProduct";
import { useRouter } from "next/router";

const KEBAB_ICON = "/images/icons/ic_kebab.png";
const NO_IMAGE = "/images/ui/no-image.png";
const DEFAULT_AVATAR = "/images/ui/ic_profile-24.png";

interface ItemDetailSectionProps {
  productId: number;
}

const ItemDetailSection = ({ productId }: ItemDetailSectionProps) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [user] = useAtom(userAtom);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { useProductDetail, addFavorite, removeFavorite, removeProduct, isLoading } = useProduct();
  const { data: productDetail } = useProductDetail(productId);

  // 초기 좋아요 상태 설정
  useEffect(() => {
    if (productDetail) {
      setIsFavorite(productDetail.isFavorite);
      setFavoriteCount(productDetail.favoriteCount);
    }
  }, [productDetail]);

  const isSvgFile = (url: string) => url.toLowerCase().endsWith(".svg");

  useEffect(() => {
    let isMounted = true;

    const loadImage = () => {
      if (!productDetail?.images?.[0]) {
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
  }, [productDetail?.images]);

  // 드롭다운 외부 클릭 처리
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isDropdownOpen && !target.closest(".kebab-menu")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleFavorite = useCallback(async () => {
    if (!user) {
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    if (!productDetail) return;

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
  }, [productDetail, isFavorite, user, addFavorite, removeFavorite]);

  const debouncedHandleFavorite = useDebouncedCallback(handleFavorite, 300);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleEdit = () => {
    router.push(`/items/${productId}/edit`);
  };

  const handleDeleteClick = () => {
    setIsDropdownOpen(false); // 드롭다운 메뉴 닫기
    setIsConfirmOpen(true); // 확인 모달 열기
  };

  const handleDeleteConfirm = async () => {
    try {
      await removeProduct(productId);
      router.push("/items");
    } catch (error) {
      console.error("상품 삭제 실패:", error);
      setAlertMessage("상품 삭제 중 오류가 발생했습니다.");
      setIsAlertOpen(true);
    } finally {
      setIsConfirmOpen(false); // 확인 모달 닫기
    }
  };

  const handleDeleteCancel = () => {
    setIsConfirmOpen(false); // 확인 모달 닫기
  };

  // productDetail이 없는 경우 로딩 상태 표시
  if (!productDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <section className="flex flex-col gap-4 md:flex-row lg:gap-6">
        {/* 이미지 영역 */}
        <div className="w-full md:w-2/5 md:max-w-[486px]">
          {imageStatus === "loading" ? (
            <div className="w-full h-[486px] flex items-center justify-center bg-gray-200 rounded-xl">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          ) : imageStatus === "loaded" && imageUrl ? (
            isSvgFile(imageUrl) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={`${productDetail.name} 상품 대표 사진`}
                className="rounded-xl w-full h-auto"
                width={486}
                height={486}
              />
            ) : (
              <Image
                src={imageUrl}
                alt={`${productDetail.name} 상품 대표 사진`}
                width={486}
                height={486}
                className="rounded-xl w-full h-auto"
                unoptimized={true}
                onError={() => setImageStatus("error")}
              />
            )
          ) : (
            <Image src={NO_IMAGE} alt="이미지 없음" width={486} height={486} className="rounded-xl w-full h-auto" />
          )}
        </div>

        {/* 상품 정보 및 좋아요 버튼 */}
        <div className="flex flex-col justify-between flex-1 items-start">
          <div className="w-full relative">
            {/* 케밥 메뉴 - 본인 상품일 때만 표시 */}
            {user && productDetail && user.id === productDetail.ownerId && (
              <div className="absolute right-0 kebab-menu">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="relative">
                  <Image src={KEBAB_ICON} width={24} height={24} alt="메뉴" className="w-6 h-6" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg p-2 text-sm text-gray-700 z-10">
                    <button onClick={handleEdit} className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">
                      수정하기
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-red-500"
                      disabled={isLoading.remove}
                    >
                      {isLoading.remove ? "삭제 중..." : "삭제하기"}
                    </button>
                  </div>
                )}
              </div>
            )}

            <div>
              <div className="text-base font-semibold mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">
                {productDetail.name}
              </div>
              <div className="text-2xl font-semibold md:text-3xl lg:text-4xl">
                {productDetail.price.toLocaleString()}원
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            <div>
              <div className="text-gray-600 text-sm font-medium mb-2">상품 소개</div>
              <p className="text-base leading-[140%]">{productDetail.description}</p>
            </div>

            <div className="my-6">
              <div className="text-gray-600 text-sm font-medium mb-2">상품 태그</div>
              <TagDisplay tags={productDetail.tags} />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
            <Image src={DEFAULT_AVATAR} alt="작성자 아바타" width={24} height={24} className="rounded-full" />
            <div className="font-semibold">{productDetail.ownerNickname || "Unknown"}</div>

            <div className="h-4 border-l border-gray-300 mx-2"></div>

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

      <AlertModal isOpen={isAlertOpen} message={alertMessage} onClose={handleCloseAlert} />
      <ConfirmModal
        isOpen={isConfirmOpen}
        message="해당 상품 정보를 삭제하시겠습니까?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
};

export default ItemDetailSection;
