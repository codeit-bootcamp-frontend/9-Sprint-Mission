import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import TagItem from "./TagItem";
import styled from "styled-components";
function Tag({ className, values = [], onChange }) {
    const isRef = useRef(values.length + 1);
    const [tag, setTag] = useState("");
    const handleChange = (e) => {
        setTag(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && tag !== "") {
            e.preventDefault();
            const newTag = {
                id: isRef.current++,
                value: tag,
            };
            const updatedItems = [...values, newTag];
            onChange(updatedItems);
            setTag("");
        }
    };
    const handleTagDelete = (id) => {
        const updatedItems = values.filter((item) => item.id !== id);
        onChange(updatedItems);
    };
    return (_jsxs(_Fragment, { children: [_jsx(TagInput, { name: "tag", type: "text", placeholder: "\uD0DC\uADF8\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", className: className, value: tag, onChange: handleChange, onKeyDown: handleKeyDown }), _jsx(TagList, { children: values.map((item) => (_jsx(TagListItem, { children: _jsx(TagItem, { item: item, isDelete: true, onDelete: () => handleTagDelete(item.id) }) }, item.id))) })] }));
}
export default Tag;
const TagInput = styled.input `
  width: 100%;
  padding: 16px 24px;
  border-radius: 12px;
  background-color: rgba(243, 244, 246, 1);
  border: none;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: rgba(156, 163, 175, 1);
  }
`;
const TagList = styled.ul `
  display: flex;
  flex-wrap: wrap;
  margin-top: 14px;
  margin-bottom: 0px;
  padding: 0;
  gap: 12px;
`;
const TagListItem = styled.li `
  list-style-type: none;
`;
