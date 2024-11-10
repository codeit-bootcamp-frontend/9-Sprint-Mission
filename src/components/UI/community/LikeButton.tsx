// src/components/UI/community/LikeButton.tsx
import Image from "next/image";

// public 폴더 경로 문자열로 대체
const HEART_ICON = "/images/icons/ic_heart.png";
const HEART_PINK_ICON = "/images/icons/ic_heart_pink.png";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onLike: () => void;
  isLoading?: boolean;
}

const LikeButton = ({ isLiked, likeCount, onLike, isLoading = false }: LikeButtonProps) => {
  return (
    <button onClick={onLike} disabled={isLoading} className="flex items-center gap-1 text-sm">
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      ) : (
        <Image src={isLiked ? HEART_PINK_ICON : HEART_ICON} alt="좋아요" width={16} height={16} />
      )}
      <span className={`${isLiked ? "text-red-500" : "text-gray-500"}`}>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
