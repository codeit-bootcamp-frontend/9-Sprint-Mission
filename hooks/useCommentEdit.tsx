import { instance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useCommentEdit = (commentId: number) => {
  const commentMutation = useMutation({
    mutationKey: ["commentEdit"],
    mutationFn: (content: string) =>
      instance.patch(`/comments/${commentId}`, {
        content,
      }),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success("댓글이 수정되었습니다.");
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

export default useCommentEdit;
