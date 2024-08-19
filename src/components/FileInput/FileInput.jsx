import Resizer from "react-image-file-resizer";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import xIcon from "../../assets/ic_X.png";

const ImgPreviewWrap = styled.div`
  width: 168px;
  height: 168px;
  border-radius: 12px;
  position: relative;

  @media (min-width: 1200px) {
    width: 282px;
    height: 282px;
    border-radius: 12px;
  }
`;

const Input = styled.input`
  display: none;
`;

const Button = styled.input`
  width: 20px;
  height: 20px;
  background: url(${xIcon}) no-repeat center;
  border-style: none;
  position: absolute;
  top: 14px;
  right: 13px;
`;

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      168,
      168,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });

const FileInput = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = async (e) => {
    const nextValue = e.target.files[0];
    const supportFormats = ["image/jpeg", "image/png", "image/svg+xml"];

    if (!nextValue) return;

    if (!supportFormats.includes(nextValue.type)) {
      alert(
        "지원되지 않는 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요 :)"
      );
      return;
    }

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
      <Input
        id="file"
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <ImgPreviewWrap>
          <img src={preview} alt="이미지 미리보기" width="168" height="168" />
          <Button type="button" onClick={handleClearClick}></Button>
        </ImgPreviewWrap>
      )}
    </div>
  );
};

export default FileInput;
