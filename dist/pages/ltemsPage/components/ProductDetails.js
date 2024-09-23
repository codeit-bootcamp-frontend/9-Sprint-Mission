import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import styled from "styled-components";
import formatPrice from "../../../utils/formatPrice";
import Profile from "./Profile";
import profileImg from "../../../assets/profile.svg";
import heartImg from "../../../assets/heart.svg";
import defaultImg from "../../../assets/default.svg";
import DropDownImg from "../../../components/DropDownImg";
function ProductDetails({ datas }) {
    const idRef = useRef(0);
    const { images, name, price, description, tags = [] } = datas;
    return (_jsxs(ProductContainer, { children: [_jsx(ProductImage, { src: images || defaultImg, alt: "\uC0C1\uD488\uC774\uBBF8\uC9C0" }), _jsxs(ProductInfo, { children: [_jsxs(ProductInfoContent, { children: [_jsxs(ProductInfoHeader, { children: [_jsx(ProductInfoName, { children: name }), _jsx(DropDownImg, {})] }), _jsxs(ProductInfoPrice, { children: [formatPrice(price), "\uC6D0"] })] }), _jsxs(ProductInfoDescription, { children: [_jsx(ProductInfoSmallTitle, { children: "\uC0C1\uD488\uC18C\uAC1C" }), _jsx("p", { children: description })] }), _jsxs(ProductTagContainer, { children: [_jsx(ProductInfoSmallTitle, { children: "\uC0C1\uD488 \uD0DC\uADF8" }), tags.length !== 0 && (_jsx(ProductInfoTags, { children: tags.map((item) => (_jsxs(ProductInfoTag, { children: ["#", item] }, idRef.current++))) }))] }), _jsxs(ProductProfileSection, { children: [_jsx(Profile, { src: profileImg, nickname: "\uCD1D\uBA85\uD55C \uD310\uB2E4" }), _jsxs(ProductProfileButton, { children: [_jsx("img", { src: heartImg, alt: "\uD558\uD2B8", width: "32", height: "32" }), _jsx("span", { children: "123" })] })] })] })] }));
}
export default ProductDetails;
const ProductContainer = styled.div `
  display: flex;
  gap: 24px;
  padding: 24px 0 40px;
  border-bottom: 1px solid #e5e7eb;
  justify-content: center;
  width: 100%;

  @media (max-width: 1200px) {
    gap: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-bottom: 24px;
  }
`;
const ProductImage = styled.img `
  border-radius: 16px;
  width: 486px;
  height: 486px;

  @media (max-width: 1200px) {
    width: 340px;
    height: 340px;
  }
`;
const ProductInfo = styled.div `
  width: 690px;

  @media (max-width: 1200px) {
    width: 340px;
  }
`;
const ProductInfoContent = styled.div `
  color: #1f2937;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
  padding-bottom: 16px;
`;
const ProductInfoHeader = styled.div `
  display: flex;
  justify-content: space-between;
`;
const ProductInfoName = styled.h4 `
  font-size: 24px;
  margin: 0;
`;
const ProductInfoPrice = styled.h2 `
  font-size: 40px;
  margin-top: 16px;
  margin-bottom: 0;
`;
const ProductInfoDescription = styled.div `
  margin-bottom: 24px;
  font-size: 16px;
  color: #4b5563;

  p {
    font-weight: 400;
    margin-top: 16px;
    margin-bottom: 0;
  }

  @media (max-width: 1200px) {
    p {
      color: #1f2937;
    }
  }
`;
const ProductInfoSmallTitle = styled.span `
  font-size: 16px;
  font-weight: 600;
  color: #4b5563;
`;
const ProductTagContainer = styled.div `
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 62px;
`;
const ProductInfoTags = styled.ul `
  display: flex;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
const ProductInfoTag = styled.li `
  padding: 6px 16px;
  background-color: #f3f4f6;
  border-radius: 26px;
`;
const ProductProfileSection = styled.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 62px;
`;
const ProductProfileButton = styled.button `
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 35px;
  background-color: #fff;
  padding: 4px 12px;
  cursor: pointer;
`;
