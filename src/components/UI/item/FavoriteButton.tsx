// src/components/UI/item/FavoriteButton.tsx
import Image from "next/image";

// public 폴더 경로 문자열로 대체
const HEART_ICON = "/images/icons/ic_heart.png";
const HEART_PINK_ICON = "/images/icons/ic_heart_pink.png";

interface FavoriteButtonProps {
  isFavorite: boolean;
  favoriteCount: number;
  onFavorite?: () => void; // onFavorite 타입 정의
}

const FavoriteButton = ({
  isFavorite,
  favoriteCount,
  onFavorite, // 콜백 함수로 전달할 수 있도록 수정
}: FavoriteButtonProps) => {
  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(); // 외부로부터 전달된 콜백 함수가 있으면 호출
    }
  };

  return (
    <button
      onClick={handleFavorite} // onClick에서 함수 참조를 전달
      className="flex items-center space-x-1"
    >
      <Image
        src={isFavorite ? HEART_PINK_ICON : HEART_ICON}
        width={16}
        height={16}
        alt="좋아요 이미지 버튼"
      />
      <span>{favoriteCount}</span>
    </button>
  );
};

export default FavoriteButton;
