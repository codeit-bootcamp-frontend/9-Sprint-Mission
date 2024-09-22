import { useEffect } from "react";
import { getProducts } from "../../../Api";
import { useState } from "react";
import { Link } from "react-router-dom";
import ItemBox from "./ItemBox";
import { Item } from "../../../types/Product";

const getPageSize = (): number => {
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1200) {
    return 2;
  } else {
    return 4;
  }
};

// getProducts 함수가 반환할 타입 정의
interface ProductsResponse {
  list: Item[];
}

function BestItemList() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState<number>(getPageSize());
  const [order] = useState<string>("favorite"); // 상태로 order 추가
  const [page] = useState<number>(1); // 상태로 page 추가

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { list }: ProductsResponse = await getProducts(
          page,
          pageSize,
          order
        );
        setItemList(list);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
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
                <Link to={`${item.id}`}>
                  <ItemBox item={item} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default BestItemList;
