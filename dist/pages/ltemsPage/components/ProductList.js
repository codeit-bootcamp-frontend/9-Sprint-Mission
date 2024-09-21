import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
import ProductListItem from "./ProductListItem";
import { useNavigate } from "react-router-dom";
function ProductList({ products }) {
    const navigate = useNavigate();
    return (_jsx("div", { children: _jsx(StyledProductList, { children: products.map((product) => (_jsx("li", { onClick: () => navigate(`${product.id}`), children: _jsx(ProductListItem, { product: product }) }, product.id))) }) }));
}
export default ProductList;
const StyledProductList = styled.ul `
  display: grid;
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: #1f2937;
  gap: 24px;
  grid-template-columns: repeat(5, 1fr);

  li {
    width: 221px;
    cursor: pointer;
  }

  li:nth-child(n + 11) {
    display: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    li:nth-child(n + 7) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    li:nth-child(n + 5) {
      display: none;
    }

    li {
      width: 168px;
    }

    li img {
      width: 168px;
      height: 168px;
    }
  }
`;
