import { useFavoriteCount } from "@/hooks/useFavoriteCount";
import useToken from "@/hooks/useToken";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const FavoriteCount = ({
  id,
  favoriteCount,
  location,
}: {
  id: number;
  favoriteCount: number;
  location: string;
}) => {
  const [newFavoriteCount, setNewFavoriteCount] = useState(favoriteCount);
  const { mutate: favoriteMutation } = useFavoriteCount({ id, setNewFavoriteCount, location });
  const { getAccessToken } = useToken();

  const handleFavorite = () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    
    favoriteMutation();
  };

  return (
    <button
      onClick={handleFavorite}
      className="flex items-center space-x-1 px-3 py-1 rounded-full border border-panda-gray200"
    >
      <Image
        src="/icons/ic_heart.svg"
        alt="좋아요"
        width={24}
        height={24}
        className="md:size-8"
      />
      <span className="font-medium text-panda-gray500">{newFavoriteCount}</span>
    </button>
  );
};

export default FavoriteCount;
