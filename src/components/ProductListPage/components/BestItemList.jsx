import { useEffect } from "react";
//import { getProducts } from "../../../Api";
import { useState } from "react";
import ItemBox from "./ItemBox";
//import Paginations from "../../Pagination";

function BestItemList() {
  const [itemList, setItemList] = useState([]); //eslint-disable-line no-unused-vars

  const PrdItemData = async () => {
    try {
      const response = await fetch(
        `https://panda-market-api.vercel.app/products?page=1&pageSize=4`
      );
      const products = await response.json();
      setItemList(products.list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const bestItems = itemList.sort((a, b) => b.favoriteCount - a.favoriteCount);

  useEffect(() => {
    PrdItemData();
  }, []);

  return (
    <>
      <div className="product-wrap">
        <h2 className="list-title">베스트 상품</h2>
        <ul className="product-list best">
          {bestItems &&
            bestItems.map((item) => {
              return (
                <li key={item.id}>
                  <ItemBox item={item} />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default BestItemList;
