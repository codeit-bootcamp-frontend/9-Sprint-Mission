import React, { useEffect, useState, useCallback } from "react";
import { getBestProducts } from "../utils/api";
import Product from "./Product";
import "./BestProducts.css";

export default function BestProducts({ itemCount = 4 }) {
  const [bestItems, setBestItems] = useState([]);

  const handleLoadBestItems = useCallback(async () => {
    let result;

    try {
      result = await getBestProducts(itemCount);
    } catch (error) {
      console.log(error);
      return;
    } finally {
    }

    const { list } = result;

    setBestItems([...list]);
  }, [itemCount]);

  useEffect(() => {
    handleLoadBestItems();
  }, [itemCount, handleLoadBestItems]);

  return (
    <div className='wrapper'>
      {/* <h3 id='best-title'>베스트 상품</h3> */}
      <div id='best-products'>
        <ul id='best-lists'>
          {bestItems.map((item) => {
            return (
              <li key={item.id} className='product-list'>
                <Product key={item.id} props={item} isBestProducts={true} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
