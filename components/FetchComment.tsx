"use server";

import { instance } from "@/lib/axios";
import axios from "axios";

export const FetchComment = async (id: number, cursor: number = 0, location: string) => {
  if (!id || !location) return { list: [], nextCursor: null };
  
  try {
    const requestUrl =
      location === "board"
        ? `/articles/${id}/comments?limit=10&cursor=${cursor}`
        : `/products/${id}/comments?limit=10&cursor=${cursor}`;

    const response = await instance.get(requestUrl);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("댓글 조회 실패", error.response?.data);
      return { error: error.response?.data.message };
    }
  }

  return { list: [], nextCursor: null };
};
