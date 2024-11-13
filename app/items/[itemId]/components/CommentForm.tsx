import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../../zodSchema/commentSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useComment } from "@/hooks/useComment";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface CommentFormProps {
  itemId: number;
}

const CommentForm = ({ itemId }: CommentFormProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: {
      comment: "",
    },
  });
  const { mutate: commentMutation } = useComment(itemId);

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    try {
      commentMutation(
        {
          comment: data.comment,
        },
        {
          onSuccess: (response) => {
            if (response.status === 201) {
              reset();
              queryClient.invalidateQueries({ queryKey: ["comments", String(itemId)] });
            }
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("댓글 등록 실패", error.response?.data);
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h2 className="font-semibold">문의하기</h2>
      <textarea
        {...register("comment")}
        rows={5}
        name="comment"
        className="resize-none px-6 py-4 bg-panda-gray100 rounded-xl text-sm text-panda-gray400 leading-6"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />
      {errors.comment && <span className="error-text-start">{errors.comment.message}</span>}
      <button
        type="submit"
        className="custom-submit-button w-fit self-end"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "등록중" : "등록"}
      </button>
    </form>
  );
};

export default CommentForm;
