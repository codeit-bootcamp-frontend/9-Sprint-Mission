import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import formatPrice from "../../../utils/formatPrice";
import defaultImg from "../../../assets/default.svg";
import styled from "styled-components";
import { ProductDescription, ProductPrice, ProductLike, } from "../../../utils/constants";
function ProductListItem({ product }) {
    return (_jsxs(_Fragment, { children: [_jsx(ProductImg, { src: product.images || defaultImg, alt: product.name }), _jsx(ProductDescription, { children: product.description }), _jsxs(ProductPrice, { children: [formatPrice(product.price), "\uC6D0"] }), _jsxs(ProductLike, { children: ["\u2661 ", product.favoriteCount] })] }));
}
export default ProductListItem;
const ProductImg = styled.img `
  width: 221px;
  height: 221px;
  border-radius: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    width: 168px;
    height: 168px;
  }
`;
