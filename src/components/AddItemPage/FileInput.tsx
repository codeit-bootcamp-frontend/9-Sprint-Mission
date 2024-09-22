//import styles from "./Additem.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./FileInput.module.css";

interface FileInputProps {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}
const FileInput: React.FC<FileInputProps> = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files ? e.target.files[0] : null;
    onChange(name, nextValue);
  };

  // 파일 초기화 버튼
  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    // 미리보기
    if (!value) return;
    const nextPreview = URL.createObjectURL(value); // 문자열 리턴
    setPreview(nextPreview);

    // 사이드 이펙트 정리
    return () => {
      setPreview(undefined);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <>
      <div className={styles.fileWrapper}>
        <div className={styles.filebox}>
          <div className="uploadFile">
            <div className={styles.imgCnt}>
              <label htmlFor="file" className={styles.inputFileLabel}>
                <span className="file-txt">이미지 등록</span>
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                ref={inputRef}
                id="file"
                className={styles.inputFile}
              />
            </div>
          </div>
          <div className="previewFile">
            {preview && (
              <div className={styles.imgCnt}>
                <img src={preview} alt="미리보기" />
                {value && (
                  <button
                    type="button"
                    onClick={handleClearClick}
                    className="btnCancel"
                  >
                    cancel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {preview && (
          <em className={styles.uploadWarning}>
            *이미지 등록은 최대 1개까지 가능합니다.
          </em>
        )}
      </div>
    </>
  );
};

export default FileInput;
