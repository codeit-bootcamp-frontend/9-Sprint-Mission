"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addItemSchema } from "./addItemConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import { instance } from "@/lib/axios";
import { useState } from "react";
import { imgUpload } from "@/lib/utils";
import useToken from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface INewTag {
  tag: string | number;
}

// 제작중 (태그 수정 필요 - 현재 삭제와 제출 시 태그가 string으로 바뀌는 문제가 있음)
const AddItem = () => {
  const context = useToken();
  const router = useRouter();

  const [imgError, setImgError] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const [tagInput, setTagInput] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof addItemSchema>>({
    resolver: zodResolver(addItemSchema),
    mode: "all",
    defaultValues: {
      itemImg: null,
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      itemTag: [],
    },
  });

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        }
      };

      imagePreview.readAsDataURL(file);
    }
  };

  const deletePreviewImg = () => {
    setPreviewSrc("");
    setValue("itemImg", null);
  };

  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTag = e.target.value;
    setTagInput(newTag);
  };

  const tags = getValues("itemTag");
  const img = getValues("itemImg");

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleDeleteTag = (clickTag: string | number) => {
    setValue(
      "itemTag",
      tags?.filter((tag) => tag.tag !== clickTag)
    );
  };

  const onSubmit = async (values: z.infer<typeof addItemSchema>) => {
    try {
      context?.checkTokenExpire();

      let currentImgSrc: string | undefined;
      console.log(values.itemTag);
      if (typeof context?.accessToken === "string") {
        currentImgSrc = await imgUpload(getValues, "items", context?.accessToken);
      }

      const response = await instance.post(
        "/products",
        {
          images: [currentImgSrc],
          name: values.itemName,
          description: values.itemDescription,
          price: values.itemPrice,
          tags: tags?.map((tag) => ({ tag })),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${context?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        reset();
        router.push(`/items/${data.id}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("additem POST API 요청에서 오류 발생", error);
        toast.error(error.response?.data.message);
      }
    }
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">상품 등록하기</h2>
        <button type="submit" className="custom-submit-button">
          {isSubmitting ? "등록중" : "등록"}
        </button>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-bold">상품 이미지</h3>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="itemImg"
              className="flex flex-col space-y-3 items-center justify-center w-[168px] h-[168px] bg-[--color-gray100] rounded-xl lg:w-[282px] lg:h-[282px] cursor-pointer"
            >
              <Image src="/icons/plus.png" alt="이미지 추가" width={48} height={48} />
              <span className="text-[--color-gray400] ml-0">이미지 등록</span>
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
        {inputArr.map((arr) => (
          <div key={arr.id} className="flex flex-col space-y-4">
            <label htmlFor={arr.id} className="text-lg font-bold">
              {arr.label}
            </label>
            {!arr.isTextarea ? (
              <input
                {...arr.register}
                type={arr.type}
                id={arr.id}
                name={arr.id}
                className="bg-[--color-gray100] px-6 py-4 rounded-xl"
                placeholder={arr.placeHolder}
              />
            ) : (
              <textarea
                {...arr.register}
                rows={8}
                id={arr.id}
                name={arr.id}
                placeholder={arr.placeHolder}
                className="bg-[--color-gray100] px-6 py-4 rounded-xl resize-none"
              />
            )}
            {arr.error && <span className="error-text-start">{arr.error}</span>}
          </div>
        ))}
        <div className="flex flex-col space-y-4">
          <label htmlFor="itemTag" className="text-lg font-bold">
            태그
          </label>
          <div className="flex flex-col space-y-3">
            <input
              {...register("itemTag")}
              onChange={handleChangeTag}
              onKeyDown={handleTagKeyDown}
              type="text"
              id="itemTag"
              name="itemTag"
              value={tagInput}
              className="bg-[--color-gray100] px-6 py-4 rounded-xl"
              placeholder="태그를 입력해주세요"
            />
            <ul className="flex items-center space-x-3 flex-wrap gap-y-3">
              {tags.length > 0 &&
                tags?.map((tag) => (
                  <li
                    key={tag.tag}
                    className="px-3 py-[6px] bg-[--color-gray100] rounded-full flex items-center space-x-[10px]"
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
