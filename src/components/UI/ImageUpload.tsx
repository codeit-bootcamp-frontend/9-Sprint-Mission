// src/components/UI/InputItem.tsx
import React, { ChangeEvent, useState } from "react";
import Label from "./InputItem";
import PlusIcon from "@/images/icons/ic_plus.svg";
import DeleteButton from "./DeleteButton";

interface ImageUploadProps {
  title: string;
}

const ImageUpload = ({ title }: ImageUploadProps) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleDelete = () => {
    setImagePreviewUrl("");
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

        {imagePreviewUrl && (
          <div
            className="relative bg-cover bg-center w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px]"
            style={{ backgroundImage: `url(${imagePreviewUrl})` }}
          >
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
