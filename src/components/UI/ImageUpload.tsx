import { ChangeEvent, useState } from "react";
import Image from "next/image";
import styles from "./ImageUpload.module.scss";
import PlusIcon from "@/assets/images/icons/ic_plus.svg";
import DeleteButton from "./Button/DeleteButton";

interface ImageUploadProps {
  title: string;
}

const ImageUpload = ({ title }: ImageUploadProps) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Optional chaining을 사용해 선택된 파일이 있을 경우에만 접근하도록 안전하게 처리

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleDelete = () => {
    setImagePreviewUrl("");
  };

  return (
    <div className={styles.imageUpload}>
      {title && <label className={styles.title}>{title}</label>}

      <div className={styles.imageUploadContainer}>
        <label htmlFor="image-upload" className={styles.uploadButton}>
          <Image src={PlusIcon} width={48} height={48} alt="이미지 등록" />
          이미지 등록
        </label>

        <input
          className={styles.hiddenFileInput}
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />

        {imagePreviewUrl && (
          <div className={styles.imagePreviewWrapper}>
            <Image
              className={styles.imagePreview}
              src={imagePreviewUrl}
              fill
              alt="이미지 미리보기"
            />
            <div className={styles.deleteButtonWrapper}>
              <DeleteButton onClick={handleDelete} label="이미지 파일" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
