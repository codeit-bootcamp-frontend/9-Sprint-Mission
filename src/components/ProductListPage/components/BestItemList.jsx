import { useEffect } from "react";
import { getProducts } from "../../../Api";
import { useState } from "react";
import ItemBox from "./ItemBox";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1200) {
    return 2;
  } else {
    return 4;
  }
};

function BestItemList() {
  const [itemList, setItemList] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const order = "favorite";
  const page = 1;

  useEffect(() => {
    async function fetchProducts() {
      const { list } = await getProducts(page, pageSize, order);
      setItemList(list);
    }
    fetchProducts();
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [page, pageSize, order]);

  return (
    <>
      <div className="product-wrap">
        <h2 className="pagetitle">베스트 상품</h2>
        <ul className="product-list best">
          {itemList?.map((item) => {
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
