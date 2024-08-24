import React, { useState, useEffect } from "react";
import "./ProductList/ProductList.css";
import ProductListItems from "./ProductListItems";
import { getProducts } from "../api";

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
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="best-product-title">베스트 상품</h2>
      <ul className="best-product-list">
        {bestProduct.map((product) => (
          <li className="best-product-list-element" key={product.id}>
            <ProductListItems product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestProductList;
