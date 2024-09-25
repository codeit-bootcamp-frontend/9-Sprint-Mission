import React from "react";
import HeartIcon from "@/images/icons/ic_heart.svg";

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
      <HeartIcon width={iconWidth} alt="좋아요 아이콘" />
      {displayCount}
    </div>
  );
};

export default LikeCountDisplay;
