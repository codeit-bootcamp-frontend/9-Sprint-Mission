"use client";

import { useForm } from "react-hook-form";
import PostImage from "./PostImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBoardSchema } from "../zodSchema/AddBoardSchema";
import { z } from "zod";
import useToken from "@/hooks/useToken";
import { toast } from "react-hot-toast";
import { addBoard } from "../actions/addBoard";
import { useRouter } from "next/navigation";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useState } from "react";

const AddBoardPost = () => {
  const [currentImg, setCurrentImg] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<z.infer<typeof addBoardSchema>>({
    resolver: zodResolver(addBoardSchema),
    mode: "onChange",
    defaultValues: {
      postTitle: "",
      post: "",
      postImg: null,
    },
  });
  const { getAccessToken } = useToken();
  const router = useRouter();
  const { mutate: imageUploadMutation } = useImageUpload();
  
  const onSubmit = async (values: z.infer<typeof addBoardSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", values.postTitle);
      formData.append("content", values.post);
      const accessToken = getAccessToken();

      if (!accessToken) {
        toast.error("인증 토큰이 없습니다.");
        return;
      }

      if (currentImg) {
        imageUploadMutation(currentImg, {
          onSuccess: async (imageUrl) => {
            formData.append("image", imageUrl.data.url);
            const response = await addBoard(formData, accessToken);

            if (response.error) {
              toast.error(response.error);
            } else {
              toast.success("게시글 등록 성공");
              reset();
              router.push(`/boards/${response.id}`);
            }
          },
          onError: () => {
            toast.error("이미지 업로드 실패");
            return;
          },
        });
      } 
    } catch (error) {
      console.error("게시글 등록 실패", error);
      toast.error("게시글 등록 실패");
    }
  };

  return (
    <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">게시글 쓰기</h2>
        <button type="submit" className="custom-submit-button" disabled={isSubmitting || !isValid}>
          {isSubmitting ? "등록중" : "등록"}
        </button>
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="postTitle" className="text-sm font-bold md:text-lg">
          제목
        </label>
        <input
          {...register("postTitle")}
          type="text"
          id="postTitle"
          name="postTitle"
          className="bg-panda-gray100 px-6 py-4 rounded-xl"
          placeholder="제목을 입력해주세요"
        />
        {errors.postTitle && <p className="error-text-start">{errors.postTitle.message}</p>}
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="post" className="text-sm font-bold md:text-lg">
          내용
        </label>
        <textarea
          {...register("post")}
          rows={8}
          id="post"
          name="post"
          className="bg-panda-gray100 px-6 py-4 rounded-xl resize-none"
          placeholder="내용을 입력해주세요"
        />
        {errors.post && <p className="error-text-start">{errors.post.message}</p>}
      </div>
      <PostImage setValue={setValue} register={register} watch={watch} errors={errors} setCurrentImg={setCurrentImg} />
    </form>
  );
};

export default AddBoardPost;
