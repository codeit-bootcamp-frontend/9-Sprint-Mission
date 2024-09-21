import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ProductListItem from "./ProductListItem";
import { getProducts } from "../../../api";
import { ProductTitle } from "../../../utils/constants";
function BestProductList() {
    const [bestProduct, setBestProduct] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts({
                    order: "favorite",
                    page: 1,
                    limit: 10,
                });
                setBestProduct(data.list);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(ProductTitle, { children: "\uBCA0\uC2A4\uD2B8 \uC0C1\uD488" }), _jsx(StyledBestProductList, { children: bestProduct.map((product) => (_jsx("li", { children: _jsx(ProductListItem, { product: product }) }, product.id))) })] }));
}
export default BestProductList;
const StyledBestProductList = styled.ul `
  display: grid;
  list-style-type: none;
  padding: 0;
  margin: 16px 0 0;
  color: #1f2937;
  gap: 24px;
  grid-template: 1fr / repeat(4, 1fr);

  li {
    width: 282px;
  }

  li img {
    width: 282px;
    height: 282px;
  }

  li:nth-child(n + 5) {
    display: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    height: 500px;
    gap: 10px;

    li:nth-child(n + 3) {
      display: none;
    }

    li img {
      width: 343px;
      height: 343px;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    li:nth-child(n + 2) {
      display: none;
    }
  }
`;
