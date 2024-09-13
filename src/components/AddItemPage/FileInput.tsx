//import styles from "./Additem.module.css";
import { useEffect, useRef, useState } from "react";
import styles from "./FileInput.module.css";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();

  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
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
      setPreview();
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
}

export default FileInput;
