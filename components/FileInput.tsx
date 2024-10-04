import styles from "./FileInput.module.css";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function FileInput() {
  const [previewURL, setPreviewURL] = useState<string>("");
  const [file, setFile] = useState<Blob | null>(null);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewURL(fileUrl);
    }
  };
  const handleClickDelete = () => {
    setFile(null);
    setPreviewURL("");
  };
  return (
    <>
      {/* 가짜 라벨 */}
      <div className={styles["image-label"]}>이미지</div>

      <div className={styles.relative}>
        <label className={styles["image-input"]} htmlFor="imageInput">
          <div className={styles["image-icon-text"]}></div>
          <div className={styles["bg-icon"]}></div>
          <div className={styles["input-text"]}>이미지 등록</div>
        </label>
        <div className={styles.preview}>
          {file && (
            <Image src={previewURL} width={282} height={282} alt="썸네일" />
          )}
        </div>
        <>
          {file && (
            <button
              className={styles["delete-btn"]}
              type="button"
              onClick={handleClickDelete}
            >
              X
            </button>
          )}
        </>
      </div>
      <input
        hidden
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleChangeFile}
      />
    </>
  );
}
