// src/components/UI/LikeCountDisplay.tsx
import Image from "next/image";

// public 폴더 경로 문자열로 대체
const HeartIcon = "/images/icons/ic_heart.png";

interface LikeCountDisplayProps {
  count: number;
  iconWidth?: number;
  fontSize?: number;
  gap?: number;
  className?: string;
}

const LikeCountDisplay = ({
  count,
  iconWidth = 16,
  fontSize = 16,
  gap = 4,
  className,
}: LikeCountDisplayProps) => {
  const displayCount = count >= 10000 ? "9999+" : count.toString();

  return (
    <div
      className={`flex items-center text-gray-500 ${className}`}
      style={{
        fontSize: `${fontSize}px`,
        gap: `${gap}px`,
      }}
    >
      <Image
        src={HeartIcon}
        width={iconWidth}
        height={iconWidth}
        alt="좋아요 아이콘"
      />
      {displayCount}
    </div>
  );
};

export default LikeCountDisplay;
