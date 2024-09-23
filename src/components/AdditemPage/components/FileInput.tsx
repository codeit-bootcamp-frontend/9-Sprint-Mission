import { useEffect, useState, useRef, ChangeEvent } from "react";
import resetImg from "../../../assets/images/icon/ic_reset.svg";
import plusImg from "../../../assets/images/icon/ic_plus.svg";
import { Values } from "../../Types/Types";

interface Props {
  name: keyof Values;
  value: File | null;
  onChange: (name: keyof Values, value: File | null) => void;
}

const FileInput = ({ name, value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // 파일 선택 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const nextValue = e.target.files[0];
      onChange(name, nextValue);
      setErrorMessage("* 이미지 등록은 최대 1개까지 가능합니다.");
    } else {
      onChange(name, null);
    }
  };

  // 파일 선택 취소 핸들러
  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    // 파일 입력 필드 비워서 null 값으로 지우기
    inputNode.value = "";
    onChange(name, null);
    setErrorMessage(""); // 에러 메시지 초기화
  };

  useEffect(() => {
    if (!value) {
      setPreview(null); // 선택된 파일이 없으면 미리보기 초기화
      return;
    }

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
            />
            <img src={plusImg} alt="이미지 등록" />
            <span>이미지 등록</span>
          </div>
        </div>

        <div className="AdditemForm-img-wrap">
          {value && (
            <img
              className="AdditemForm-img"
              src={preview as string}
              alt="이미지 미리보기"
            />
          )}
          {value && (
            <button
              type="button"
              className="reset-button"
              onClick={handleClearClick}
            >
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
