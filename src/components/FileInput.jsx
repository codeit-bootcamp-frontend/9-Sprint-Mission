import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import "./FileInput.css";
import icX from "../assets/img/ic_X.png";

export default function FileInput({ value, onChange }) {
  const ref = useRef();
  const [preview, setPreview] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setPreview(url);
    }
  }, [value]);

  const handleImageInput = () => {
    if (value) {
      setError(true);
      return;
    }

    ref.current?.click();
    setError(false);
  };

  const handleChange = () => {
    const newValue = ref.current.files[0];
    onChange("imgFile", newValue);
  };

  const handleDelete = () => {
    onChange("imgFile", "");
    ref.current.value = "";
  };

  return (
    <section id='image-section'>
      <div id='image-form'>
        <label htmlFor='file'>
          <div className='image-input' onClick={handleImageInput}>
            <FaPlus size='48px' />
            <p>이미지 업로드</p>
          </div>
        </label>
        <input type='file' name='file' onChange={handleChange} ref={ref} />
        {value && (
          <div className='preview-wrapper'>
            <img src={preview} alt='이미지 미리보기' id='preview' />
            <button onClick={handleDelete} className='preview-delete'>
              <img src={icX} alt='이미지 삭제버튼' />
            </button>
          </div>
        )}
      </div>
      {error && (
        <p className='error'>* 이미지 등록은 최대 1개까지 가능합니다.</p>
      )}
    </section>
  );
}
