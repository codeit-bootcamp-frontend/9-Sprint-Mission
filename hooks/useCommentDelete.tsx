import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { CommentDeleteAtom } from "@/atom/itemAtom";
import { useSetAtom } from "jotai";

export const useCommentDelete = (commentId: number) => {
  const queryClient = useQueryClient();
  const setIsDelete = useSetAtom(CommentDeleteAtom);

  const commentMutation = useMutation({
    mutationKey: ["commentDelete"],
    mutationFn: () => instance.delete(`/comments/${commentId}`),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success("댓글이 삭제되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["comments", String(commentId)] });
        setIsDelete(false);
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
