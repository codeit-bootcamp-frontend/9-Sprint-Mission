import { useEffect } from "react";
import { getProducts } from "../../../Api";
import { useState } from "react";
import ItemBox from "./ItemBox";
//import Paginations from "../../Pagination";

function BestItemList() {
  const [itemList, setItemList] = useState([]); //eslint-disable-line no-unused-vars
  const [order, setOrder] = useState(""); //eslint-disable-line no-unused-vars
  const page = 1;
  const pageSize = 10; // 페이지당 제품 수

  useEffect(() => {
    async function fetchProducts() {
      const { list } = await getProducts(page, pageSize, order);
      setItemList(list);
    }
    fetchProducts();
  }, [page, pageSize, order]);

  const bestItems = itemList.sort((a, b) => b.favoriteCount - a.favoriteCount);

  return (
    <>
      <div className="product-wrap">
        <h2 className="list-title">베스트 상품</h2>
        <ul className="product-list best">
          {bestItems?.map((item) => {
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
