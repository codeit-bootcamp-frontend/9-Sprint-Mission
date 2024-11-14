import { instance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface FavoriteCountProps {
  productId: number;
  setNewFavoriteCount: Dispatch<SetStateAction<number>>;
}

export const useFavoriteCount = ({ productId, setNewFavoriteCount }: FavoriteCountProps) => {
  const favoriteMutation = useMutation({
    mutationKey: ["favoriteCount"],
    mutationFn: () => instance.post(`/products/${productId}/favorite`),
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
