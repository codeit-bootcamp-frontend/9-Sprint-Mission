"use client";

import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { UseFormSetValue } from "react-hook-form";
import { addBoardSchema } from "../zodSchema/AddBoardSchema";
import { z } from "zod";

interface PostImageProps {
  setValue: UseFormSetValue<z.infer<typeof addBoardSchema>>;
  register: UseFormRegister<z.infer<typeof addBoardSchema>>;
  watch: UseFormWatch<z.infer<typeof addBoardSchema>>;
  errors: FieldErrors<z.infer<typeof addBoardSchema>>;
  setCurrentImg: Dispatch<SetStateAction<File | null>>;
}

const PostImage = ({ setValue, register, watch, errors, setCurrentImg }: PostImageProps) => {
  const [imgError, setImgError] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      const file = files[0];
      const imgCheck = file.size < 5 * 1024 * 1024;

      if (!imgCheck) {
        setImgError("이미지는 5MB를 넘을 수 없습니다.");
        return;
      }

      setImgError("");
      e.target.value = "";

      const imagePreview = new FileReader();
      imagePreview.onloadend = () => {
        if (imagePreview.result && typeof imagePreview.result === "string") {
          setValue("postImg", imagePreview.result);
          setPreviewSrc(imagePreview.result);
          setCurrentImg(file);
        }
      };
      imagePreview.readAsDataURL(file);
    }
  };

  const deletePreviewImg = () => {
    setPreviewSrc("");
    setValue("postImg", null);
  };

  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-sm font-bold md:text-lg">이미지</h3>
      <div className="flex items-center justify-between md:justify-normal md:space-x-8">
        <label
          htmlFor="postImg"
          className="flex flex-col space-y-3 items-center justify-center w-[168px] h-[168px] bg-panda-gray100 rounded-xl lg:w-[282px] lg:h-[282px]"
        >
          <Image src="/icons/plus.png" alt="이미지 추가" width={48} height={48} />
          <span className="text-panda-gray400 ml-0">이미지 등록</span>
        </label>
        <input
          {...register("postImg")}
          type="file"
          id="postImg"
          accept="image/*"
          onChange={handleChangeImg}
          className="hidden"
        />
        {watch("postImg") && (
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
      {errors.postImg && <span className="error-text-start">{errors.postImg.message}</span>}
    </div>
  );
};

export default PostImage;
