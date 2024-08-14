import { useState } from 'react';
import resetImg from '../../../assets/images/icon/ic_reset.svg';
import plusImg from '../../../assets/images/icon/ic_plus.svg';

const FileInput = () => {
  const [preview, setPreview] = useState();
  return (
    <div className="AdditemForm-input-wrap">
      <h3 className="AdditemForm-sub-tit">상품 이미지</h3>
      <div className="AdditemForm-FileInput-wrap">
        <div className="AdditemForm-file">
          <input type="file" accept="image/png, image/jpeg" />
          <img src={plusImg} />
          <span>이미지 등록</span>
        </div>
        <img className="AdditemForm-img" src={preview} alt="이미지 미리보기" />
        <button className="reset-button">
          <img src={resetImg} alt="선택해제" />
        </button>
      </div>
    </div>
  );
};

export default FileInput;
