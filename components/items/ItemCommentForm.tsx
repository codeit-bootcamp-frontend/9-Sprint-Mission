import { commentSchema } from "@/app/boards/[postId]/commentConstants";
import useToken from "@/hooks/useToken";
import { instance } from "@/lib/axios";
import { IComment } from "@/types/boardsTypeShare";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface IProps {
  itemId: number;
  setItemComments: Dispatch<SetStateAction<IComment[]>>;
}

const ItemCommentForm = ({ itemId, setItemComments }: IProps) => {
  const context = useToken();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    mode: "all",
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    try {
      context?.checkTokenExpire();

      const response = await instance.post(`/products/${itemId}/comments`, {
        content: values.comment
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context?.accessToken}`
        }
      });

      if (response.status === 201) {
        toast.success("댓글이 등록되었습니다.");
        reset();
        setItemComments((prevComments) => [response.data, ...prevComments]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("itemCommentForm에서 api 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h2 className="font-semibold">문의하기</h2>
      <textarea
        {...register("comment")}
        rows={5}
        id="comment"
        name="comment"
        className="resize-none px-6 py-4 bg-[--color-gray100] rounded-xl text-sm text-[--color-gray400] leading-6"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />
      {errors.comment && <span className="error-text-start">{errors.comment.message}</span>}
      <button type="submit" className="custom-submit-button w-fit self-end" disabled={!isValid}>
        {isSubmitting ? "등록중" : "등록"}
      </button>
    </form>
  );
};

export default ItemCommentForm;
