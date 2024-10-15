"use client";

import useToken from "@/hooks/useToken";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addBoardSchema } from "./addBoardConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";
import { imgUpload } from "@/lib/utils";

type FormValues = z.infer<typeof addBoardSchema>;

const AddBoard = () => {
  const context = useToken();
  const router = useRouter();
  const { setValue, getValues, watch } = useForm<FormValues>();
  
  const [imgError, setImgError] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");

  const form = useForm<z.infer<typeof addBoardSchema>>({
    resolver: zodResolver(addBoardSchema),
    mode: "all",
    defaultValues: {
      postTitle: "",
      post: "",
      postImg: null,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors;
  const formValue = watch();

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      const file = files[0];

      const imgCheck = file.size < 5 * 1024 * 1024;

      if (!imgCheck) {
        setImgError("이미지는 최대 1개만 등록가능합니다.");
        return;
      }

      setImgError("");

      e.target.value = "";

      const imagePreview = new FileReader();

      imagePreview.onloadend = () => {
        if (imagePreview.result && typeof imagePreview.result === "string") {
          setValue("postImg", imagePreview.result);
          setPreviewSrc(imagePreview.result);
        }
      };

      imagePreview.readAsDataURL(file);
    }
  };

  const deletePreviewImg = () => {
    setPreviewSrc("");
    setValue("postImg", null);
  };

  const handleSubmit = async (values: z.infer<typeof addBoardSchema>) => {
    try {
      context?.checkTokenExpire();

      let currentImgSrc: string | undefined;

      if (typeof context?.accessToken === "string") {
        currentImgSrc = await imgUpload(getValues, "boards", context?.accessToken);
      }
      // console.log(currentImgSrc)
      const response = await instance.post(
        "/articles",
        {
          image: currentImgSrc,
          content: values.post,
          title: values.postTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${context?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        form.reset();
        router.push(`/boards/${data.id}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("addBoard 게시글 POST 요청에서 api 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">게시글 쓰기</h2>
        <button
          type="submit"
          className="custom-submit-button"
          disabled={!form.formState.isValid}
        >
          {isLoading ? "등록중" : "등록"}
        </button>
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="postTitle" className="text-sm font-bold md:text-lg">
          제목
        </label>
        <input
          {...form.register("postTitle")}
          type="text"
          id="postTitle"
          name="postTitle"
          className="bg-[--color-gray100] px-6 py-4 rounded-xl"
          placeholder="제목을 입력해주세요"
        />
        {error && <span className="error-text-start">{error.postTitle?.message}</span>}
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="post" className="text-sm font-bold md:text-lg">
          내용
        </label>
        <textarea
          {...form.register("post")}
          rows={8}
          id="post"
          name="post"
          className="bg-[--color-gray100] px-6 py-4 rounded-xl resize-none"
          placeholder="내용을 입력해주세요"
        />
        {error && <span className="error-text-start">{error.post?.message}</span>}
      </div>
      <div className="flex flex-col space-y-3">
        <h3 className="text-sm font-bold md:text-lg">이미지</h3>
        <div className="flex items-center justify-between md:justify-normal md:space-x-8">
          <label
            htmlFor="postImg"
            className="flex flex-col space-y-3 items-center justify-center w-[168px] h-[168px] bg-[--color-gray100] rounded-xl lg:w-[282px] lg:h-[282px]"
          >
            <Image src="/icons/plus.png" alt="이미지 추가" width={48} height={48} />
            <span className="text-[--color-gray400] ml-0">이미지 등록</span>
          </label>
          <input
            {...form.register("postImg")}
            type="file"
            id="postImg"
            accept="image/*"
            onChange={handleChangeImg}
            className="hidden"
          />
          {formValue.postImg && (
            <div className="flex flex-col items-end w-[168px] h-[168px] relative lg:w-[282px] lg:h-[282px]">
              <button onClick={deletePreviewImg} type="button" className="mt-2 mr-3 z-10">
                <Image src="/icons/delete.png" alt="삭제" width={24} height={24} />
              </button>
              {previewSrc && (
                <Image
                  src={previewSrc}
                  alt="미리보기"
                  style={{ objectFit: "cover" }}
                  fill
                  className="absolute w-[168px] h-[168px] rounded-xl lg:w-[282px] lg:h-[282px]"
                />
              )}
            </div>
          )}
        </div>
        {imgError && <span className="error-text-start">{imgError}</span>}
        {error && <span className="error-text-start">{error.postImg?.message}</span>}
      </div>
    </form>
  );
};

export default AddBoard;
