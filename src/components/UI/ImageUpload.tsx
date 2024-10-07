// src/components/UI/InputItem.tsx
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { uploadImage } from "@/api/uploadImage";
import { isValidImageFile } from "@/utils/validateImageFile";
import AlertModal from "./modal/AlertModal";

// public 폴더 경로 문자열로 대체
const PLUS_ICON = "/images/icons/ic_plus.png";

interface ImageUploadProps {
  title: string;
  onImageUpload: (imageUrl: string | null) => void; // 부모 컴포넌트로 이미지 URL을 전달하는 콜백 함수
}

const ImageUpload = ({ title, onImageUpload }: ImageUploadProps) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(""); // 이미지 미리보기 URL
  const [imageStatus, setImageStatus] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle"); // 이미지 상태
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // AlertModal을 제어하는 상태

  // 이미지 변경 핸들러
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // 파일 확장자 검증
      if (!isValidImageFile(file)) {
        setAlertMessage(
          "유효하지 않은 이미지 파일입니다.<br />JPEG, PNG, GIF, SVG 형식의 파일만 업로드 가능합니다."
        );
        return;
      }

      // 파일 크기 제한 확인 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setAlertMessage("이미지 파일은 최대 5MB까지 업로드할 수 있습니다.");
        return;
      }

      setImageStatus("loading");

      let imageUrl = "";
      // 이미지 파일 업로드
      imageUrl = await uploadImage(file);
      // 이미지 URL을 미리보기로 설정
      setImagePreviewUrl(imageUrl);
      setImageStatus("loaded");

      // 업로드된 이미지 URL을 부모 컴포넌트로 전달
      onImageUpload(imageUrl);
    }
  };

  // 이미지 삭제 핸들러
  const handleDelete = () => {
    setImagePreviewUrl("");
    setImageStatus("idle");

    // 이미지가 삭제되었음을 부모 컴포넌트로 전달
    onImageUpload(null);
  };

  // AlertModal 닫기 핸들러
  const handleCloseAlert = () => {
    setAlertMessage(null); // 알림 메시지를 비우고 모달을 닫음
  };

  return (
    <div>
      <label className="block text-sm font-bold mb-3 sm:text-lg">{title}</label>
      <div className="flex gap-2 sm:gap-4 lg:gap-6">
        {/* 이미지 업로드 버튼 */}
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

        {/* 로딩 중일 때 */}
        {imageStatus === "loading" && (
          <div className="flex items-center justify-center w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px] bg-gray-100">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* 이미지 미리보기 */}
        {imageStatus === "loaded" && imagePreviewUrl && (
          <div className="relative w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px] overflow-hidden">
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

      {/* Alert Modal */}
      {alertMessage && (
        <AlertModal message={alertMessage} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

export default ImageUpload;
