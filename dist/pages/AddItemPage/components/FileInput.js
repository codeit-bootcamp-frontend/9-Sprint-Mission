import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import plusImg from "../../../assets/plus.svg";
import XImg from "../../../assets/X.svg";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
function FileInput({ name, value, onChange }) {
    const [preview, setPreview] = useState(undefined);
    const [showWarning, setShowWarning] = useState(false);
    const inputRef = useRef(null);
    const handleChange = (e) => {
        if (preview) {
            setShowWarning(true);
            return;
        }
        const nextValue = e.target.files ? e.target.files[0] : null;
        onChange(name, nextValue);
    };
    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputNode)
            return;
        inputNode.value = "";
        setPreview(undefined);
        setShowWarning(false);
        onChange(name, null);
    };
    useEffect(() => {
        if (!value)
            return;
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
    return (_jsxs(FileInputMain, { children: [_jsxs(FileInputTop, { children: [_jsx(FileInputButton, { htmlFor: "FileInput-box", children: _jsxs(FileInputElement, { children: [_jsx("img", { src: plusImg, alt: "\uB354\uD558\uAE30", width: "48", height: "48" }), _jsx(FileInputElementText, { children: "\uC774\uBBF8\uC9C0 \uB4F1\uB85D" })] }) }), _jsx("input", { type: "file", id: "FileInput-box", style: { display: "none" }, onChange: handleChange, ref: inputRef }), preview && (_jsxs(PreviewBox, { children: [_jsx(FileInputPreviewImg, { src: preview, alt: "\uBBF8\uB9AC\uBCF4\uAE30 \uC774\uBBF8\uC9C0", width: "282", height: "282" }), _jsx(PreviewClearButton, { src: XImg, alt: "\uC9C0\uC6B0\uAE30 \uBC84\uD2BC", onClick: handleClearClick })] }))] }), showWarning && (_jsx(WarningText, { children: "*\uC774\uBBF8\uC9C0 \uB4F1\uB85D\uC740 \uCD5C\uB300 1\uAC1C\uAE4C\uC9C0 \uAC00\uB2A5\uD569\uB2C8\uB2E4." }))] }));
}
export default FileInput;
const FileInputMain = styled.div `
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    gap: 10px;
  }
`;
const FileInputTop = styled.div `
  display: flex;
  gap: 24px;

  @media (max-width: 1200px) {
    gap: 10px;
  }
`;
const FileInputButton = styled.label `
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
const FileInputElement = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
const FileInputElementText = styled.span `
  font-size: 16px;
  font-weight: 400;
  color: #9ca3af;
`;
const FileInputPreviewImg = styled.img `
  border: none;
  border-radius: 12px;

  @media (max-width: 1200px) {
    width: 168px;
    height: 168px;
  }
`;
const PreviewBox = styled.div `
  position: relative;
`;
const PreviewClearButton = styled.img `
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
const WarningText = styled.p `
  font-size: 14px;
  font-weight: 400;
  color: #f74747;
  margin-top: 16px;
  margin-bottom: 0;
`;
