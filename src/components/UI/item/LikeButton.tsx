// src/components/UI/InputItem.tsx
import React, { useState } from "react";
import HeartIcon from "/images/icons/ic_heart.svg";

interface LikeButtonProps {
  isFavorite: boolean;
  favoriteCount: number;
  onLike: unknown;
}

const LikeButton = ({
  isFavorite: initialIsFavorite,
  favoriteCount: initialFavoriteCount,
}: LikeButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);

  const handleLike = () => {
    setIsFavorite(!isFavorite);
    setFavoriteCount(isFavorite ? favoriteCount - 1 : favoriteCount + 1);
  };

  return (
    <button
      onClick={() => handleLike}
      className={`flex items-center space-x-1 ${
        isFavorite ? "text-red-500" : "text-gray-500"
      }`}
    >
      <HeartIcon className={isFavorite ? "fill-current" : "stroke-current"} />
      <span>{favoriteCount}</span>
    </button>
  );
};

export default LikeButton;
