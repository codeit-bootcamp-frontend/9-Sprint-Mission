// src/components/UI/ImageUpload.tsx
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { uploadImage } from "@/utils/uploadImage";
import { isValidImageFile } from "@/utils/validateImageFile";
import AlertModal from "./modal/AlertModal";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import LoadingSpinner from "./LoadingSpinner";

// public 폴더 경로 문자열로 대체
const PLUS_ICON = "/images/icons/ic_plus.png";

interface ImageUploadProps {
  title: string;
  onImageUpload: (imageUrl: string | null) => void;
}

const ImageUpload = ({ title, onImageUpload }: ImageUploadProps) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [imageStatus, setImageStatus] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");
  const [user] = useAtom(userAtom);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!isValidImageFile(file)) {
        setAlertMessage(
          "유효하지 않은 이미지 파일입니다.<br />JPEG, PNG, GIF, SVG 형식의 파일만 업로드 가능합니다."
        );
        setIsAlertOpen(true);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setAlertMessage("이미지 파일은 최대 5MB까지 업로드할 수 있습니다.");
        setIsAlertOpen(true);
        return;
      }

      setImageStatus("loading");

      try {
        let imageUrl = "";
        if (user) {
          const uploadResponse = await uploadImage(file);
          imageUrl = uploadResponse.url;
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            const byteArray = new Uint8Array(e.target?.result as ArrayBuffer);
            imageUrl = URL.createObjectURL(new Blob([byteArray]));
          };
          reader.readAsArrayBuffer(file);
        }

        setImagePreviewUrl(imageUrl);
        setImageStatus("loaded");
        onImageUpload(imageUrl);
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        setAlertMessage(
          "이미지 업로드 중 오류가 발생했습니다. 다시 시도해 주세요."
        );
        setIsAlertOpen(true);
        setImageStatus("error");
      }
    }
  };

  const handleDelete = () => {
    setImagePreviewUrl("");
    setImageStatus("idle");
    onImageUpload(null);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-bold mb-3 sm:text-lg">{title}</label>
      <div className="flex gap-2 sm:gap-4 lg:gap-6">
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center gap-3 cursor-pointer bg-gray-100 hover:bg-gray-50 text-gray-400 text-base w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px]"
        >
          <Image src={PLUS_ICON} width={48} height={48} alt="이미지 등록" />
          이미지 등록
        </label>

        <input
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          alt={title}
        />

        <div className="flex items-center justify-center w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px] bg-gray-100">
          {/* 이미지 업로드 중 로딩 스피너 */}
          <LoadingSpinner isLoading={imageStatus === "loading"} />
          {/* 이미지 업로드 완료 시 이미지 표시 */}
          {imageStatus === "loaded" && imagePreviewUrl && (
            <div className="relative w-full h-full">
              <Image
                src={imagePreviewUrl}
                alt="업로드된 이미지"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-3 right-3">
                <DeleteButton onClick={handleDelete} label="이미지 파일" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AlertModal 컴포넌트 */}
      <AlertModal
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </div>
  );
};

export default ImageUpload;
