import plusImg from "../../../assets/plus.svg";
import XImg from "../../../assets/X.svg";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";
import { FileInputProps } from "../../../types/types";

function FileInput({ name, value, onChange }: FileInputProps) {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (preview) {
      setShowWarning(true);
      return;
    }

    const nextValue = e.target.files ? e.target.files[0] : null;
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    setPreview(undefined);
    setShowWarning(false);
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(undefined);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  useEffect(() => {
    if (!preview) {
      setShowWarning(false);
    }
  }, [preview]);

  return (
    <FileInputMain>
      <FileInputTop>
        <FileInputButton htmlFor="FileInput-box">
          <FileInputElement>
            <img src={plusImg} alt="더하기" width="48" height="48" />
            <FileInputElementText>이미지 등록</FileInputElementText>
          </FileInputElement>
        </FileInputButton>
        <input
          type="file"
          id="FileInput-box"
          style={{ display: "none" }}
          onChange={handleChange}
          ref={inputRef}
        />
        {preview && (
          <PreviewBox>
            <FileInputPreviewImg
              src={preview}
              alt="미리보기 이미지"
              width="282"
              height="282"
            />
            <PreviewClearButton
              src={XImg}
              alt="지우기 버튼"
              onClick={handleClearClick}
            />
          </PreviewBox>
        )}
      </FileInputTop>
      {showWarning && (
        <WarningText>*이미지 등록은 최대 1개까지 가능합니다.</WarningText>
      )}
    </FileInputMain>
  );
}

export default FileInput;

const FileInputMain = styled.div`
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    gap: 10px;
  }
`;

const FileInputTop = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 1200px) {
    gap: 10px;
  }
`;

const FileInputButton = styled.label`
  width: 282px;
  height: 282px;
  background-color: #f3f4f6;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) {
    width: 168px;
    height: 168px;
  }
`;

const FileInputElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const FileInputElementText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #9ca3af;
`;

const FileInputPreviewImg = styled.img`
  border: none;
  border-radius: 12px;

  @media (max-width: 1200px) {
    width: 168px;
    height: 168px;
  }
`;

const PreviewBox = styled.div`
  position: relative;
`;

const PreviewClearButton = styled.img`
  position: absolute;
  right: 12px;
  top: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 9999px;
  padding: 0;
`;

const WarningText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #f74747;
  margin-top: 16px;
  margin-bottom: 0;
`;
