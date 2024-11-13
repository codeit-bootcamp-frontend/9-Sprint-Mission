// src/components/UI/item/FavoriteButton.tsx
import Image from "next/image";

// public 폴더 경로 문자열로 대체
const HEART_ICON = "/images/icons/ic_heart.png";
const HEART_PINK_ICON = "/images/icons/ic_heart_pink.png";

interface FavoriteButtonProps {
  isFavorite: boolean;
  favoriteCount: number;
  onFavorite: () => void;
  isLoading?: boolean;
}

const FavoriteButton = ({ isFavorite, favoriteCount, onFavorite, isLoading = false }: FavoriteButtonProps) => {
  return (
    <button onClick={onFavorite} disabled={isLoading} className="flex items-center gap-1 text-sm">
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      ) : (
        <Image src={isFavorite ? HEART_PINK_ICON : HEART_ICON} alt="좋아요" width={16} height={16} />
      )}
      <span className="text-gray-500">{favoriteCount}</span>
    </button>
  );
};

export default FavoriteButton;
