// src/components/UI/InputItem.tsx
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Label from "./InputItem";
import PlusIcon from "@/images/icons/ic_plus.svg";
import DeleteButton from "./DeleteButton";

interface ImageUploadProps {
  title: string;
}

const ImageUpload = ({ title }: ImageUploadProps) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageStatus, setImageStatus] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageStatus("loading");
      const imageUrl = URL.createObjectURL(file);
      try {
        const response = await fetch(
          `/api/imageProxy?url=${encodeURIComponent(imageUrl)}`,
          { method: "HEAD" }
        );
        if (response.ok) {
          setImagePreviewUrl(imageUrl);
          setImageStatus("loaded");
        } else {
          setImageStatus("error");
          alert("유효하지 않은 이미지입니다.");
        }
      } catch (error) {
        console.error("이미지 검증 중 오류 발생:", error);
        setImageStatus("error");
        alert("이미지 검증 중 오류가 발생했습니다.");
      }
    }
  };

  const handleDelete = () => {
    setImagePreviewUrl("");
    setImageStatus("idle");
  };

  return (
    <div>
      {title && <Label id="image-upload-label" label={title} placeholder="" />}

      <div className="flex gap-2 sm:gap-4 lg:gap-6">
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center gap-3 cursor-pointer bg-gray-100 hover:bg-gray-50 text-gray-400 text-base w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px]"
        >
          <PlusIcon />
          이미지 등록
        </label>

        <input
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        {imageStatus === "loading" && (
          <div className="flex items-center justify-center w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px] bg-gray-100">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {imageStatus === "loaded" && imagePreviewUrl && (
          <div className="relative w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px] overflow-hidden">
            <Image
              src={imagePreviewUrl}
              alt="업로드된 이미지"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-3 right-3">
              <DeleteButton onClick={handleDelete} label="이미지 파일" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
