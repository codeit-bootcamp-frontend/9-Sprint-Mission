import { useEffect, useState, useRef, ChangeEvent } from "react";
import styles from "./FileInput.module.css";
import Image from "next/image";

interface FileInputProps {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

function FileInput({ name, value, onChange }: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files ? e.target.files[0] : null;

    if (preview && nextValue) {
      alert("이미지는 한 개만 등록할 수 있습니다.");
      return;
    }

    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    setPreview(null);
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      URL.revokeObjectURL(nextPreview);
      setPreview(null);
    };
  }, [value]);

  return (
    <div className={styles.fileInputMain}>
      <div className={styles.fileInputTop}>
        <label
          className={styles.fileInputButton}
          htmlFor={`${name}-file-input`}
        >
          <div className={styles.fileInputElement}>
            <Image src="/images/plus.svg" alt="더하기" width="48" height="48" />
            <span className={styles.fileInputElementText}>이미지 등록</span>
          </div>
        </label>
        <input
          type="file"
          id={`${name}-file-input`}
          style={{ display: "none" }}
          onChange={handleChange}
          ref={inputRef}
        />
        {preview && (
          <div className={styles.previewBox}>
            <Image
              className={styles.fileInputPreviewImg}
              src={preview}
              alt="미리보기 이미지"
              width="282"
              height="282"
            />
            <Image
              className={styles.previewClearButton}
              src="/images/X.svg"
              alt="지우기 버튼"
              width="20"
              height="20"
              onClick={handleClearClick}
            />
          </div>
        )}
      </div>
      {/* 경고 텍스트는 상태가 아닌 조건문으로 처리 */}
      {preview && (
        <p className={styles.warningText}>
          *이미지 등록은 최대 1개까지 가능합니다.
        </p>
      )}
    </div>
  );
}

export default FileInput;
