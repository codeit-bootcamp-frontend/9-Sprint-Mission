import { useState, useEffect } from "react";
import styled from "styled-components";
import ProductListItem from "./ProductListItem";
import { getProducts } from "../../../api";
import { ProductTitle } from "../../../utils/constants";
import { Product } from "../../../types/types";

function BestProductList() {
  const [bestProduct, setBestProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({
          order: "favorite",
          page: 1,
          limit: 10,
        });
        setBestProduct(data.list);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <ProductTitle>베스트 상품</ProductTitle>
      <StyledBestProductList>
        {bestProduct.map((product) => (
          <li key={product.id}>
            <ProductListItem product={product} />
          </li>
        ))}
      </StyledBestProductList>
    </>
  );
}

export default BestProductList;

const StyledBestProductList = styled.ul`
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
