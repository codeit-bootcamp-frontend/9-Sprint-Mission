"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addItemSchema } from "./zodSchema/addItemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useAddItem } from "@/hooks/useAddItem";

export interface INewTag {
  tag: string;
}

const AddItem = () => {
  const router = useRouter();

  const [imgError, setImgError] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [currentImg, setCurrentImg] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof addItemSchema>>({
    resolver: zodResolver(addItemSchema),
    mode: "onChange",
    defaultValues: {
      itemImg: "",
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      itemTag: [],
    },
  });
  const { mutate: imageUploadMutation } = useImageUpload();
  const { mutate: addItemMutation, isPending: isAddItemPending } = useAddItem();
  const img = getValues("itemImg");
  const tags = watch("itemTag");

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
          setValue("itemImg", imagePreview.result);
          setPreviewSrc(imagePreview.result);
          setCurrentImg(file);
        }
      };
      imagePreview.readAsDataURL(file);
    }
  };

  const deletePreviewImg = () => {
    setPreviewSrc("");
    setValue("itemImg", null);
  };

  const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    const newTag = e.target.value;
    setTagInput(newTag);
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      const newTag: INewTag = {
        tag: tagInput.trim(),
      };

      if (tags?.some((tag) => tag.tag === newTag.tag)) {
        setTagInput("");
        return;
      }

      const newValues = [...(tags || []), newTag];

      setValue("itemTag", newValues);
      setTagInput("");
    }
  };

  const handleDeleteTag = (clickTag: string) => {
    const updatedTags = tags?.filter((tag) => tag.tag !== clickTag);
    setValue("itemTag", updatedTags);
  };

  const inputArr = [
    {
      register: { ...register("itemName") },
      label: "상품명",
      type: "text",
      id: "itemName",
      placeHolder: "상품명을 입력해주세요",
      error: errors.itemName?.message,
    },
    {
      register: { ...register("itemDescription") },
      label: "상품 소개",
      id: "itemDescription",
      isTextarea: true,
      placeHolder: "상품 소개를 입력해주세요",
      error: errors.itemDescription?.message,
    },
    {
      register: { ...register("itemPrice") },
      label: "판매 가격",
      type: "number",
      id: "itemPrice",
      placeHolder: "판매 가격을 입력해주세요",
      error: errors.itemPrice?.message,
    },
  ];

  const onSubmit = async (data: z.infer<typeof addItemSchema>) => {
    try {
      let currentImgSrc: string | undefined;

      if (currentImg) {
        const formData = new FormData();
        formData.append("image", currentImg);

        imageUploadMutation(currentImg, {
          onSuccess: (imageUrl) => {
            currentImgSrc = imageUrl.data.url;

            if (typeof currentImgSrc === "string") {
              addItemMutation(
                {
                  itemImg: currentImgSrc,
                  itemName: data.itemName,
                  itemDescription: data.itemDescription,
                  itemPrice: data.itemPrice,
                  itemTag: data.itemTag,
                },
                {
                  onSuccess: (response) => {
                    if (response.status === 201) {
                      reset();
                      router.push(`/item/${response.data.id}`);
                    }
                  },
                }
              );
            }
          },
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("제품 등록 실패", error.response?.data);
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">상품 등록하기</h2>
        <button
          type="submit"
          className="custom-submit-button"
          disabled={!isValid || isAddItemPending}
        >
          {isAddItemPending ? "등록중" : "등록"}
        </button>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-bold">상품 이미지</h3>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="itemImg"
              className="flex flex-col space-y-3 items-center justify-center w-[168px] h-[168px] bg-panda-gray100 rounded-xl lg:w-[282px] lg:h-[282px] cursor-pointer"
            >
              <Image src="/icons/plus.png" alt="이미지 추가" width={48} height={48} />
              <span className="text-panda-gray400 ml-0">이미지 등록</span>
            </label>
            <input
              {...register("itemImg")}
              onChange={handleChangeImg}
              type="file"
              id="itemImg"
              name="itemImg"
              accept="image/*"
              className="hidden"
            />
            {img && (
              <div className="flex flex-col items-end w-[168px] h-[168px] relative lg:w-[282px] lg:h-[282px]">
                <button type="button" onClick={deletePreviewImg} className="mt-2 mr-3 z-10">
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
          {imgError !== "" && <p className="error-text-start">{imgError}</p>}
          {errors.itemImg && <span className="error-text-start">{errors.itemImg.message}</span>}
        </div>
        {inputArr.map((item) => (
          <div key={item.id} className="flex flex-col space-y-4">
            <label htmlFor={item.id} className="text-lg font-bold">
              {item.label}
            </label>
            {!item.isTextarea ? (
              <input
                {...item.register}
                type={item.type}
                id={item.id}
                name={item.id}
                className="bg-panda-gray100 px-6 py-4 rounded-xl"
                placeholder={item.placeHolder}
              />
            ) : (
              <textarea
                {...item.register}
                rows={8}
                id={item.id}
                name={item.id}
                placeholder={item.placeHolder}
                className="bg-panda-gray100 px-6 py-4 rounded-xl resize-none"
              />
            )}
            {item.error && <span className="error-text-start">{item.error}</span>}
          </div>
        ))}
        <div className="flex flex-col space-y-4">
          <label htmlFor="itemTag" className="text-lg font-bold">
            태그
          </label>
          <div className="flex flex-col space-y-3">
            <input
              onChange={handleChangeTag}
              onKeyDown={handleTagKeyDown}
              type="text"
              id="itemTag"
              name="itemTag"
              value={tagInput}
              className="bg-panda-gray100 px-6 py-4 rounded-xl"
              placeholder="태그를 입력해주세요"
            />
            <ul className="flex items-center space-x-3 flex-wrap gap-y-3">
              {tags?.map((tag) => (
                <li
                  key={tag.tag}
                  className="px-3 py-[6px] bg-panda-gray100 rounded-full flex items-center space-x-[10px]"
                >
                  <span>{tag.tag}</span>
                  <button
                    type="button"
                    className="flex items-center justify-center"
                    onClick={() => handleDeleteTag(tag.tag)}
                  >
                    <Image src="/icons/delete.png" alt="삭제" width={20} height={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddItem;
