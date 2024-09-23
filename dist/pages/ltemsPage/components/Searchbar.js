import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import styled from "styled-components";
import searchImg from "../../../assets/search.svg";
import { ProductTitle } from "../../../utils/constants";
function Searchbar({ onChange }) {
    return (_jsxs(ProductNav, { children: [_jsx(ProductTitle, { children: "\uC804\uCCB4 \uC0C1\uD488" }), _jsxs(ProductSearch, { children: [_jsx("img", { src: searchImg, alt: "\uB3CB\uBCF4\uAE30", width: "24", height: "24" }), _jsx(ProductInput, { placeholder: "\uAC80\uC0C9\uD560 \uC0C1\uD488\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", type: "text" })] }), _jsx(ProductButton, { children: _jsx(ProductButtonLink, { to: "/additem", children: "\uC0C1\uD488 \uB4F1\uB85D\uD558\uAE30" }) }), _jsxs(ProductOptions, { onChange: onChange, children: [_jsx("option", { value: "recent", children: "\uCD5C\uC2E0\uC21C" }), _jsx("option", { value: "favorite", children: "\uC88B\uC544\uC694\uC21C" })] })] }));
}
export default Searchbar;
const ProductNav = styled.div `
  display: grid;
  grid-template-columns: 1fr 1fr 325px 133px 130px;
  grid-gap: 12px;
  align-items: center;
  margin: 40px 0 24px;
  grid-template-areas: "title . search button options";

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 0 264px 133px 130px;
  }

  @media (max-width: 768px) {
    grid-template: 1fr 1fr/1.2fr 1fr 91px 42px;
    grid-template-areas:
      "title  . button button"
      "search search  search options";
    grid-column-gap: 0;
    grid-row-gap: 8px;
    margin: 24px 0 16px;
  }
`;
const ProductSearch = styled.div `
  display: flex;
  align-items: center;
  grid-area: search;
  gap: 4px;
  border: 0;
  border-radius: 12px;
  background-color: #f3f4f6;
  width: 325px;
  height: 42px;
  padding: 9px 0 9px 16px;

  @media (max-width: 1200px) {
    width: 264px;
  }

  @media (max-width: 768px) {
    width: 288px;
  }
`;
const ProductInput = styled.input `
  font-size: 16px;
  font-weight: 400;
  color: #000;
  border: 0;
  width: 100%;
  background-color: #f3f4f6;
  outline: none;

  ::placeholder {
    color: #9ca3af;
  }
`;
const ProductButton = styled.div `
  width: 133px;
  height: 42px;
  padding: 8px auto;
  background-color: #3692ff;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  grid-area: button;
  text-align: center;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProductButtonLink = styled(Link) `
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #f3f4f6;
  text-decoration: none;
`;
const ProductOptions = styled.select `
  display: flex;
  align-items: top;
  width: 130px;
  height: 42px;
  padding: 10px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 400;
  color: #1f2937;
  grid-area: options;

  @media (max-width: 768px) {
    width: 42px;
  }
`;
