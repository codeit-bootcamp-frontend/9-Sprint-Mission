import { commentSchema } from "@/app/items/zodSchema/commentSchema";
import { instance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

export const useComment = (id: number, location: string) => {
  const requestUrl = location === "item" ? `/products/${id}/comments` : `/articles/${id}/comments`;

  const commentMutation = useMutation({
    mutationKey: ["comment"],
    mutationFn: (values: z.infer<typeof commentSchema>) => {
      return instance.post(requestUrl, {
        content: values.comment,
      });
    },
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success("댓글 등록이 완료되었습니다.");
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });

  return commentMutation;
};
