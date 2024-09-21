import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import resetImg from "../../../assets/images/icon/ic_reset.svg";
const Tag = ({ tags, handleTagDelete }) => {
    return (_jsx(TagStyle, { children: tags.map((tag) => (_jsxs(TagName, { children: [`#${tag}`, _jsx("button", { onClick: () => handleTagDelete(tag), children: _jsx("img", { src: resetImg, alt: "\uC120\uD0DD\uD574\uC81C" }) })] }, tag))) }));
};
export default Tag;
export const TagStyle = styled.ul `
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
export const TagName = styled.li `
  font-size: 16px;
  font-weight: 400;
  border-radius: 26px;
  background-color: #f3f4f6;
  color: #1f2937;
  padding: 6px 12px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
