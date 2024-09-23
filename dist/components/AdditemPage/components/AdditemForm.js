import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styled from "styled-components";
import FileInput from "./FileInput";
import Tag from "./Tag";
const INITIAL_VALUES = {
    images: null,
    name: "",
    price: 0,
    description: "",
    tags: [],
};
const AdditemForm = ({ initialValues = INITIAL_VALUES }) => {
    const [value, setValue] = useState(initialValues);
    const [tagValue, setTagValue] = useState("");
    const { name, price, description, tags } = value;
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 새 폼 데이터 인스턴스 생성
        const formData = new FormData();
        // 각 필드의 값을 지정(key, value)
        if (value.images) {
            formData.append("images", value.images);
        }
        formData.append("name", value.name);
        formData.append("price", JSON.stringify(value.price));
        formData.append("description", value.description);
        formData.append("tags", JSON.stringify(value.tags));
        // 성공적으로 추가된 후 초기화
        setValue(INITIAL_VALUES);
    };
    // 폼 필드 변경 처리 => name: 필드의 이름, value: 새로운 값
    const handleChange = (name, value) => {
        // 기존의 상태를 복사하고, 지정된 name에 해당하는 값을 새로 전달된 value로 업데이트
        setValue((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    // 입력 필드 값 변경 처리 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };
    // 태그 추가 함수
    const addTag = (tag) => {
        // 빈칸 X, 중복 X
        if (tag && tag.trim() !== "" && !value.tags.includes(tag)) {
            setValue((prevValue) => ({
                ...prevValue,
                tags: [...prevValue.tags, tag],
            }));
            setTagValue("");
        }
    };
    const handleTagChange = (e) => {
        setTagValue(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag(tagValue);
        }
    };
    const handleTagDelete = (tagDelete) => {
        setValue((prevValue) => ({
            ...prevValue,
            tags: prevValue.tags.filter((tag) => tag !== tagDelete),
        }));
    };
    return (_jsxs("form", { className: "AdditemForm", onSubmit: handleSubmit, children: [_jsxs("div", { className: "AdditemForm-submit-wrap", children: [_jsx("h2", { className: "AdditemForm-main-tit", children: "\uC0C1\uD488 \uB4F1\uB85D\uD558\uAE30" }), _jsx(Button, { type: "submit", disabled: !name || !(price > 0) || !description || !tags[0], children: "\uB4F1\uB85D" })] }), _jsx(FileInput, { name: "images", value: value.images, onChange: handleChange }), _jsxs("div", { className: "AdditemForm-input-wrap", children: [_jsx("label", { htmlFor: "name", className: "AdditemForm-sub-tit", children: "\uC0C1\uD488\uBA85" }), _jsx("input", { type: "text", id: "name", name: "name", value: value.name, placeholder: "\uC0C1\uD488\uBA85\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", onChange: handleInputChange })] }), _jsxs("div", { className: "AdditemForm-input-wrap", children: [_jsx("label", { htmlFor: "description", className: "AdditemForm-sub-tit", children: "\uC0C1\uD488 \uC18C\uAC1C" }), _jsx("textarea", { id: "description", name: "description", value: value.description, placeholder: "\uC0C1\uD488 \uC18C\uAC1C\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", className: "AdditemForm-content", onChange: handleInputChange })] }), _jsxs("div", { className: "AdditemForm-input-wrap", children: [_jsx("label", { htmlFor: "price", className: "AdditemForm-sub-tit", children: "\uD310\uB9E4\uAC00\uACA9" }), _jsx("input", { type: "number", id: "price", name: "price", value: value.price, placeholder: "\uD310\uB9E4 \uAC00\uACA9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", onChange: handleInputChange })] }), _jsxs("div", { className: "AdditemForm-input-wrap", children: [_jsx("label", { htmlFor: "tags", className: "AdditemForm-sub-tit", children: "\uD0DC\uADF8" }), _jsx("input", { type: "text", id: "tags", name: "tags", value: tagValue || "", placeholder: "\uD0DC\uADF8\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", onChange: handleTagChange, onKeyDown: handleKeyDown }), _jsx(Tag, { tags: value.tags, handleTagDelete: handleTagDelete })] })] }));
};
export default AdditemForm;
export const Button = styled.button `
  font-size: 1.6rem;
  font-weight: 600;
  color: #f3f4f6;
  background-color: ${({ disabled }) => (disabled ? `#9CA3AF` : `#3692FF`)};
  border-radius: 8px;
  padding: 12px 32px;
`;
