import "./FileInput.css";
import plusImg from "../../assets/plus.svg";
import XImg from "../../assets/X.svg";
import { useEffect, useState, useRef } from "react";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const inputRef = useRef();

  const handleChange = (e) => {
    if (preview) {
      setShowWarning(true);
      return;
    }

    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    setPreview();
    setShowWarning(false);
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
    <div className="FileInput-main">
      <div className="FileInput-top">
        <label className="FileInput-button" htmlFor="FileInput-box">
          <div className="FileInput-element">
            <img src={plusImg} alt="더하기" width="48" height="48" />
            <span className="FileInput-element-text">이미지 등록</span>
          </div>
        </label>
        <input
          type="file"
          id="FileInput-box"
          style={{ display: "none" }}
          onChange={handleChange}
          ref={inputRef}
        />
        {preview && (
          <div className="preview-box">
            <img
              src={preview}
              alt=""
              width="282"
              height="282"
              className="FileInput-preview-img"
            />

            <img
              src={XImg}
              alt="X"
              width="20"
              height="20"
              type="button"
              className="preview-clear-button"
              onClick={handleClearClick}
            />
          </div>
        )}
      </div>
      {showWarning && (
        <p className="warning-text">*이미지 등록은 최대 1개까지 가능합니다.</p>
      )}
    </div>
  );
}

export default FileInput;
