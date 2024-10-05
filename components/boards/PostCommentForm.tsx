import { postCommentSchema } from "@/app/boards/[postId]/commentConstants";
import useToken from "@/hooks/useToken";
import { instance } from "@/lib/axios";
import { getRefreshToken } from "@/lib/utils";
import { IComment } from "@/types/boardsTypeShare";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface IProps {
  postId: number;
  setPostComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const PostCommentForm = ({ postId, setPostComments }: IProps) => {
  const { refresh } = useRouter();
  const context = useToken();

  const form = useForm<z.infer<typeof postCommentSchema>>({
    resolver: zodResolver(postCommentSchema),
    mode: "all",
    defaultValues: {
      postComment: "",
    },
  });

  const isLoading = form.formState.isLoading;
  const error = form.formState.errors;

  const handleSubmit = async (values: z.infer<typeof postCommentSchema>) => {
    try {
      const response = await instance.post(
        `/articles/${postId}/comments`,
        {
          content: values.postComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${context?.accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("댓글이 등록되었습니다.");
        form.reset();
        setPostComments((prevComments) => [response.data, ...prevComments]);
        refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("postCommentForm에서 api 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    if (!context?.accessToken && typeof context?.refreshToken === "string") {
      getRefreshToken(context?.refreshToken);
    }
  }, [context]);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-4">
      <textarea
        {...form.register("postComment")}
        rows={5}
        name="postComment"
        placeholder="댓글을 입력해주세요."
        className="resize-none px-6 py-4 bg-[--color-gray100] w-full rounded-xl"
      />
      {error && <span className="error-text-start">{error.postComment?.message}</span>}
      <button
        type="submit"
        className="px-6 py-3 text-white bg-[--color-theme] hover:bg-[--color-theme-hover] disabled:bg-[--color-gray400] rounded-lg self-end font-semibold transition-all"
        disabled={!form.formState.isValid}
      >
        {isLoading ? "등록중" : "등록"}
      </button>
    </form>
  );
};

export default PostCommentForm;
