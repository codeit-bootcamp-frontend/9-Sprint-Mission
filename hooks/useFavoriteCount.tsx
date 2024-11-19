import { instance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface FavoriteCountProps {
  id: number;
  setNewFavoriteCount: Dispatch<SetStateAction<number>>;
  location: string;
}

export const useFavoriteCount = ({ id, setNewFavoriteCount, location }: FavoriteCountProps) => {
  const requestUrl = location === "board" ? `/articles/${id}/like` : `/products/${id}/favorite`;
  const favoriteMutation = useMutation({
    mutationKey: ["favoriteCount"],
    mutationFn: () => instance.post(requestUrl),
    onMutate: () => {
      setNewFavoriteCount((prev) => prev + 1);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
        setNewFavoriteCount((prev) => prev - 1);
      }
    },
  });

  return favoriteMutation;
};
