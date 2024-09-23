import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
import Tag from "./Tag";
import ContentInput from "./ContentInput";
function ItemForm({ values, handleFileChange, handleInputChange, handleTagChange, onSubmit, }) {
    const isFormValid = () => {
        return (values.title !== "" &&
            values.content !== "" &&
            values.price !== "" &&
            values.tags.length !== 0);
    };
    return (_jsxs(ItemFormMain, { onSubmit: onSubmit, children: [_jsxs(AddItemBar, { children: [_jsx(AddItemBarTitle, { children: "\uC0C1\uD488 \uB4F1\uB85D\uD558\uAE30" }), _jsx(AddItemBarButton, { type: "submit", disabled: !isFormValid(), children: "\uB4F1\uB85D" })] }), _jsx(ItemFormSection, { title: "\uC0C1\uD488\uC774\uBBF8\uC9C0", children: _jsx(ContentInput, { title: "\uC0C1\uD488\uC774\uBBF8\uC9C0", name: "imgFile", value: values.imgFile, onChange: handleFileChange }) }), _jsx(ItemFormSection, { title: "\uC0C1\uD488\uBA85", children: _jsx(ItemFormMainInput, { name: "title", placeholder: "\uC0C1\uD488\uBA85\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", value: values.title, onChange: handleInputChange }) }), _jsx(ItemFormSection, { title: "\uC0C1\uD488 \uC18C\uAC1C", children: _jsx(ItemFormMainTextarea, { name: "content", placeholder: "\uC0C1\uD488 \uC18C\uAC1C\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", value: values.content, onChange: handleInputChange }) }), _jsx(ItemFormSection, { title: "\uD310\uB9E4\uAC00\uACA9", children: _jsx(ItemFormMainInput, { name: "price", placeholder: "\uD310\uB9E4 \uAC00\uACA9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", value: values.price, onChange: handleInputChange }) }), _jsx(ItemFormSection, { title: "\uD0DC\uADF8", children: _jsx(TagMainInput, { children: _jsx(Tag, { name: "tags", values: values.tags, onChange: handleTagChange }) }) })] }));
}
export default ItemForm;
const ItemFormMain = styled.form `
  display: flex;
  flex-direction: column;
  padding-bottom: 59px;

  @media (max-width: 1200px) {
    padding-bottom: 78px;
  }

  @media (max-width: 768px) {
    padding-bottom: 70px;
  }
`;
const ItemFormMainTitle = styled.label `
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
`;
const ItemFormMainInput = styled.input `
  padding: 16px 24px;
  background-color: #f3f4f6;
  border: 0;
  border-radius: 12px;
  margin-bottom: 32px;
  font-size: 16px;
  font-weight: 400;
  color: #000;
  height: 56px;

  &::placeholder {
    color: #9ca3af;
  }
`;
const ItemFormMainTextarea = styled.textarea `
  padding: 16px 24px;
  background-color: #f3f4f6;
  border: 0;
  border-radius: 12px;
  margin-bottom: 32px;
  font-size: 16px;
  font-weight: 400;
  color: #000;
  height: 282px;
  resize: none;

  &::placeholder {
    color: #9ca3af;
  }
`;
const TagMainInput = styled.div `
  margin: 0;
`;
const AddItemBar = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0 24px;
`;
const AddItemBarTitle = styled.h2 `
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;
const AddItemBarButton = styled.button `
  width: 74px;
  height: 42px;
  padding: 12px 0;
  border: 0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #f3f4f6;
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#3692ff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
// 추가된 ItemFormSection 컴포넌트
const ItemFormSection = ({ title, children, }) => (_jsxs(_Fragment, { children: [_jsx(ItemFormMainTitle, { children: title }), children] }));
