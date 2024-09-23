import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import resetImg from "../../../assets/images/icon/ic_reset.svg";
import plusImg from "../../../assets/images/icon/ic_plus.svg";
const FileInput = ({ name, value, onChange }) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    // 파일 선택 핸들러
    const handleChange = (e) => {
        if (e.target.files !== null && e.target.files.length > 0) {
            const nextValue = e.target.files[0];
            onChange(name, nextValue);
            setErrorMessage("* 이미지 등록은 최대 1개까지 가능합니다.");
        }
        else {
            onChange(name, null);
        }
    };
    // 파일 선택 취소 핸들러
    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputNode)
            return;
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
    return (_jsxs("div", { className: "AdditemForm-input-wrap", children: [_jsx("label", { htmlFor: "images", className: "AdditemForm-sub-tit", children: "\uC0C1\uD488 \uC774\uBBF8\uC9C0" }), _jsxs("div", { className: "AdditemForm-FileInput-wrap", children: [_jsx("div", { className: "AdditemForm-file-wrap", children: _jsxs("div", { className: "AdditemForm-file", children: [_jsx("input", { id: "images", type: "file", accept: "image/png, image/jpeg", ref: inputRef, onChange: handleChange }), _jsx("img", { src: plusImg, alt: "\uC774\uBBF8\uC9C0 \uB4F1\uB85D" }), _jsx("span", { children: "\uC774\uBBF8\uC9C0 \uB4F1\uB85D" })] }) }), _jsxs("div", { className: "AdditemForm-img-wrap", children: [value && (_jsx("img", { className: "AdditemForm-img", src: preview, alt: "\uC774\uBBF8\uC9C0 \uBBF8\uB9AC\uBCF4\uAE30" })), value && (_jsx("button", { type: "button", className: "reset-button", onClick: handleClearClick, children: _jsx("img", { src: resetImg, alt: "\uC120\uD0DD\uD574\uC81C" }) }))] })] }), errorMessage && _jsx("p", { className: "AdditemForm-error", children: errorMessage })] }));
};
export default FileInput;
