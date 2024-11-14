import { useForm } from "react-hook-form";
import { commentSchema } from "../../zodSchema/commentSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCommentEdit } from "@/hooks/useCommentEdit";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { CommentEditAtom } from "@/atom/itemAtom";
import { useSetAtom } from "jotai";

interface CommentEditProps {
  comment: string;
  id: number;
}

const CommentEdit = ({ comment, id }: CommentEditProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    mode: "onSubmit",
    defaultValues: {
      comment,
    },
  });
  const { mutate: commentEditMutation } = useCommentEdit(id);
  const queryClient = useQueryClient();
  const setIsEdit = useSetAtom(CommentEditAtom);

  const onSubmit = (data: z.infer<typeof commentSchema>) => {
    try {
      commentEditMutation(data.comment, {
        onSuccess: (response) => {
          if (response.status === 200) {
            queryClient.invalidateQueries({ queryKey: ["comments", String(id)] });
            setIsEdit(false);
          }
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("댓글 수정 실패", error.response?.data);
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full space-y-3">
      <textarea
        {...register("comment")}
        rows={2}
        className="resize-none px-6 py-4 bg-panda-gray100 rounded-xl text-sm text-panda-gray400 leading-6"
        defaultValue={comment}
      />
      {errors.comment && <span className="error-text-start">{errors.comment.message}</span>}
      <div className="flex items-center justify-end space-x-3">
        <button
          type="button"
          className="bg-white font-semibold hover:border-[1px] border-panda-gray200 rounded-lg px-6 py-3"
          onClick={() => setIsEdit(false)}
        >
          취소
        </button>
        <button type="submit" className="custom-submit-button" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "수정중" : "수정 완료"}
        </button>
      </div>
    </form>
  );
};

export default CommentEdit;
