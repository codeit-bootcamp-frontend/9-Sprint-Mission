import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
import XImg from "../../../assets/X.svg";
function TagItem({ item, onDelete, isDelete }) {
    const handleDeleteClick = () => onDelete(item.id);
    return (_jsxs(StyledTagItem, { children: [_jsxs("span", { children: ["#", item.value] }), _jsx(TagItemButton, { children: isDelete && (_jsx("img", { src: XImg, alt: "\uCDE8\uC18C", width: "20", height: "20", onClick: handleDeleteClick })) })] }));
}
export default TagItem;
const StyledTagItem = styled.div `
  padding: 6px 12px 6px 16px;
  background-color: #f3f4f6;
  border-radius: 26px;
  font-size: 16px;
  font-weight: 400;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 9px;
`;
const TagItemButton = styled.button `
  width: 20px;
  height: 20px;
  border: 0;
  cursor: pointer;
`;
