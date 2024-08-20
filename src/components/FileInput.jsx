import { useState, useRef, useEffect } from "react";
import styles from "./FileInput.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();

  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return; // dom 노드 생성 후
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
    <>
      <p className={cx("productImg")}>상품이미지</p>
      <div className={cx("imgBox")}>
        <label htmlFor={cx("imgInput")} className={cx("addBtn")}>
          <span className={cx("registerImg")}>이미지등록</span>
        </label>
        <input
          type="file"
          id={cx("imgInput")}
          ref={inputRef}
          onChange={handleChange}
        />
        <div className={cx("previewBox")}>
          {value && (
            <img
              src={preview}
              alt={"이미지 미리보기"}
              className={cx("preview")}
            />
          )}
          {value && (
            <button
              type="button"
              onClick={handleClearClick}
              className={cx("removeBtn")}
              aria-label="delete"
            ></button>
          )}
        </div>
      </div>
      {/* <p className={cx("errorText")}>*이미지 등록은 최대 1개까지 가능합니다.</p> */}
    </>
  );
}

export default FileInput;
