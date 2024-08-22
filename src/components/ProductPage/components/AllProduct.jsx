import { useEffect, useState } from "react";
import { getPandaMarket } from "../../../api";
import Search from "./Search";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import usePageSize, { orderByType } from "../../hooks/usePageSize";

const AllProduct = () => {
  const pageSize = usePageSize(orderByType.recent);
  const [allItems, setAllItems] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState();

  useEffect(() => {
    const fetchPandaMarket = async ({ orderBy, pageSize, page }) => {
      const products = await getPandaMarket({ orderBy, pageSize, page });
      setAllItems(products.list);
      setTotalPageNum(Math.ceil(products.totalCount) / pageSize);
    };

    fetchPandaMarket({ orderBy, pageSize, page });
  }, [orderBy, pageSize, page]);

  // 셀렉트 박스 이벤트 핸들러
  const handleChangeSelect = (event) => {
    const order = event.target.value;
    setOrderBy(order);
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div id="product-all">
      <div className="product-search-wrap">
        <h2 className="product-tit">전체 상품</h2>
        <Search handleChangeSelect={handleChangeSelect} />
      </div>
      <ul className="product-wrap">
        {allItems?.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </ul>
      <Pagination
        totalPageNum={totalPageNum}
        activePageNum={page}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AllProduct;
