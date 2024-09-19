import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState, } from "react";
import { Header } from "./Header";
import styles from "./styles/Additem.module.css";
import { Tag } from "./Tag";
export function Additem() {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [tags, setTags] = useState([]);
    const fileInputRef = useRef(null); // ref의 초기값이 null
    const [formValues, setFormValues] = useState({
        productImg: "",
        productName: "",
        productDescription: "",
        productPrice: "",
        productTag: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { [name]: value })));
    };
    const onChangeNum = (e) => {
        const { value } = e.target;
        let str = value.replaceAll(",", "");
        setFormValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { productPrice: str })));
    };
    const addComma = (num) => {
        let returnString = num === null || num === void 0 ? void 0 : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    };
    const isFilled = Object.entries(formValues)
        .filter(([key]) => key !== "productTag")
        .every(([_, value]) => value.trim() !== "");
    //file 인풋 관련
    //1. file 이미지 미리보기
    const handleFileChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]; // files = FileList객체를 반환. 선택한 파일이 없다면 null 또는 undefined이므로 [0]에 접근 불가
        if (file) {
            setFile(file);
            setFormValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { productImg: "yes" })));
        }
    };
    // 2. 파일 개수 제한
    const handleFileClick = (e) => {
        if (file) {
            setError("*이미지 등록은 최대 1개까지 가능합니다.");
            e.preventDefault();
        }
    };
    // 3. 파일 삭제버튼
    const handleDeleteBtn = (e) => {
        e.preventDefault();
        setFile(null);
        setPreview(null);
        setError("");
        setFormValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { productImg: "" })));
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // 입력 필드의 value값은 null이 될 수 없다
        }
    };
    // 태그 관련 함수
    // 1. 엔터로 태그 추가하기
    const handleTagEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const tagValue = formValues.productTag.trim();
            if (tagValue) {
                setTags((prevTags) => [...prevTags, tagValue]); // 태그 배열에 값 넘겨주기
                setFormValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { productTag: "" })));
            }
        }
    };
    // 2. 태그 삭제
    const handleTagDeleteBtn = (tagToDelete) => {
        setTags((prevTags) => prevTags.filter((index) => index !== tagToDelete));
    };
    useEffect(() => {
        if (!file)
            return;
        const nextPreview = URL.createObjectURL(file);
        setPreview(nextPreview);
        return () => URL.revokeObjectURL(nextPreview);
    }, [file]);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { children: _jsxs("form", { className: styles.addForm, action: "#", children: [_jsx("h1", { className: styles.pageName, children: "\uC0C1\uD488 \uB4F1\uB85D\uD558\uAE30" }), _jsx("div", { className: styles.labelName, children: "\uC0C1\uD488 \uC774\uBBF8\uC9C0" }), _jsxs("div", { className: styles.fileInputWrapper, children: [_jsx("label", { className: styles.labelName, htmlFor: "addImg", children: _jsx("div", { className: styles.fileAddImg, onClick: handleFileClick }) }), _jsx("div", { className: styles.filePreview, children: preview && (_jsx("img", { src: preview, alt: "\uC774\uBBF8\uC9C0 \uBBF8\uB9AC\uBCF4\uAE30", className: styles.previewImg, width: "282", height: "282" })) }), preview && (_jsx("button", { className: styles.deleteBtn, type: "button", onClick: handleDeleteBtn, children: _jsx("span", { className: styles.blind, children: "\uC0AD\uC81C" }) })), _jsx("input", { id: "addImg", className: styles.hiddenInput, onChange: handleFileChange, name: "productImg", type: "file", accept: "image/jpeg, image/png", ref: fileInputRef })] }), error && _jsx("strong", { className: styles.errorMsg, children: error }), _jsx("label", { className: styles.labelName, children: "\uC0C1\uD488\uBA85" }), _jsx("input", { id: "addName", onChange: handleChange, name: "productName", placeholder: "\uC0C1\uD488\uBA85\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", type: "text" }), _jsx("label", { className: styles.labelName, htmlFor: "addDescription", children: "\uC0C1\uD488 \uC18C\uAC1C" }), _jsx("textarea", { id: "addDescription", name: "productDescription", placeholder: "\uC0C1\uD488 \uC18C\uAC1C\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", onChange: handleChange }), _jsx("label", { className: styles.labelName, htmlFor: "addPrice", children: "\uD310\uB9E4 \uAC00\uACA9" }), _jsx("input", { id: "addPrice", name: "productPrice", placeholder: "\uD310\uB9E4 \uAC00\uACA9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", type: "text", value: addComma(formValues.productPrice) || "", onChange: onChangeNum }), _jsx("label", { className: styles.labelName, htmlFor: "addTag", children: "\uD0DC\uADF8" }), _jsxs("div", { children: [_jsx("input", { id: "addTag", name: "productTag", type: "text", placeholder: "\uD0DC\uADF8\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", value: formValues.productTag, onChange: handleChange, onKeyDown: handleTagEnter }), _jsx("div", { className: styles.tagWrapper, children: tags.map((tag, index) => (_jsxs("div", { className: styles.tagBox, children: [_jsx(Tag, { value: tag }, index), _jsx("button", { type: "button", className: styles.TagDeleteBtn, onClick: () => handleTagDeleteBtn(tag) })] }))) })] }), _jsx("button", { type: "submit", disabled: !isFilled, className: `${styles.addBtn} ${!isFilled ? styles.disabled : ""}`, children: "\uB4F1\uB85D" })] }) })] }));
}
