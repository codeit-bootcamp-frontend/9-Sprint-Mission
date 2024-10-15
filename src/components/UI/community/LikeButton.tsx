// src/components/UI/community/LikeButton.tsx
import Image from "next/image";

// public 폴더 경로 문자열로 대체
const HEART_ICON = "/images/icons/ic_heart.png";
const HEART_PINK_ICON = "/images/icons/ic_heart_pink.png";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onLike?: () => void; // 콜백 함수 타입 정의
}

const LikeButton = ({
  isLiked,
  likeCount,
  onLike, // 외부에서 콜백으로 받는 함수
}: LikeButtonProps) => {
  const handleLike = () => {
    if (onLike) {
      onLike(); // 외부에서 전달된 onLike 콜백 실행
    }
  };

  return (
    <button
      onClick={handleLike} // 함수 참조를 전달
      className={"flex items-center space-x-1"}
    >
      <Image
        src={isLiked ? HEART_PINK_ICON : HEART_ICON}
        width={16}
        height={16}
        alt="좋아요 이미지 버튼"
        className={isLiked ? "fill-current" : "stroke-current"}
      />
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
