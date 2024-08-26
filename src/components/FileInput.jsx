import { useRef, useState, useEffect } from "react";
import styles from "./FileInput.module.css";
import addImg from "../assets/addImg.png";
import removeImg from "../assets/removeImg.png";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();

  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      <div className={styles.previewContainer}>
        <label className={styles.inputFileBox} htmlFor="itemImg">
          <img src={addImg} alt="이미지추가" width={44} height={44} />
          이미지 등록
        </label>
        <div className={styles.previewBox}>
          {value && (
            <button
              className={styles.previewCloseButton}
              onClick={handleClearClick}
            >
              <img
                className={styles.removeImg}
                src={removeImg}
                alt="이미지삭제"
                width={20}
                height={20}
              />
            </button>
          )}
          {value && (
            <img
              className={styles.preview}
              src={preview}
              alt="이미지 미리보기"
              width={282}
              height={282}
            />
          )}
        </div>
      </div>

      <input
        className={styles.inputFile}
        id="itemImg"
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
}

export default FileInput;
