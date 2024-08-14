import React, { useEffect, useState } from "react";
import { getBestProducts } from "../utils/api";
import Product from "./Product";
import "./BestProducts.css";

export default function BestProducts() {
  const [bestItems, setBestItems] = useState([]);

  const handleLoadBestItems = async () => {
    let result;

    try {
      result = await getBestProducts();
    } catch (error) {
      console.log(error);
      return;
    } finally {
    }

    const { list } = result;
    const bestProducts = list.slice(0, 4);
    console.log(bestProducts);

    setBestItems([...bestProducts]);
  };

  useEffect(() => {
    handleLoadBestItems();
  }, []);

  return (
    <div className='wrapper' id='best-products'>
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
  );
}
