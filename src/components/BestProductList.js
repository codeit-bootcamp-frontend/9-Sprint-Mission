import React, { useState, useEffect } from "react";
import "./ProductList.css";
import ProductListItems from "./ProductListItems";
import { getProducts } from "../api";

function BestProductList() {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({
          order: "favorite",
          page: 1,
          limit: 10,
        });
        setBestProducts(data.list);
        console.log(data.list);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <ul className="best-product-list">
        {bestProducts.map((product) => (
          <li key={product.id}>
            <ProductListItems product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestProductList;
