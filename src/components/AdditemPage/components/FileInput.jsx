import { useEffect, useState, useRef } from 'react';
import resetImg from '../../../assets/images/icon/ic_reset.svg';
import plusImg from '../../../assets/images/icon/ic_plus.svg';

const FileInput = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState();
  const [fileSelected, setFileSelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef();

  // 파일 선택 핸들러
  const handleChange = e => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);

    // 파일이 있으면 비활성화 / 에러 메시지 표시
    if (nextValue) {
      setFileSelected(!fileSelected);
      setErrorMessage('* 이미지 등록은 최대 1개까지 가능합니다.');
    }
  };

  // 파일 선택 취소 핸들러
  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    // 파일 입력 필드 비워서 null 값으로 지우기
    inputNode.value = '';
    onChange(name, null);

    // 에러 메시지 초기화
    setErrorMessage('');
    setFileSelected(!fileSelected);
  };

  useEffect(() => {
    if (!value) return;

    // Object URL을 만들면서 웹브라우저에 할당한 메모리인 사이드 이펙트 발생
    const nextPreview = URL.createObjectURL(value);
    // 미리보기 URL을 preview 상태에 저장
    setPreview(nextPreview);

    // 사이드 이펙트 정리 함수
    return () => {
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className="AdditemForm-input-wrap">
      <label htmlFor="images" className="AdditemForm-sub-tit">
        상품 이미지
      </label>
      <div className="AdditemForm-FileInput-wrap">
        <div className="AdditemForm-file-wrap">
          <div className="AdditemForm-file">
            <input
              id="images"
              type="file"
              accept="image/png, image/jpeg"
              ref={inputRef}
              onChange={handleChange}
              disabled={fileSelected}
            />
            <img src={plusImg} alt="이미지 등록" />
            <span>이미지 등록</span>
          </div>
        </div>

        <div className="AdditemForm-img-wrap">
          {value && <img className="AdditemForm-img" src={preview || null} alt="이미지 미리보기" />}
          {value && (
            <button type="button" className="reset-button" onClick={handleClearClick}>
              <img src={resetImg} alt="선택해제" />
            </button>
          )}
        </div>
      </div>
      {errorMessage && <p className="AdditemForm-error">{errorMessage}</p>}
    </div>
  );
};

export default FileInput;
