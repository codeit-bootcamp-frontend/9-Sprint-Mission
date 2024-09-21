import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { getPandaMarket } from "../../../api";
import Search from "./Search";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import usePageSize from "../../hooks/usePageSize";
import { Products } from "../../Types/Types";

interface Props {
  orderBy: string;
  pageSize: number;
  page: number;
}

const AllProduct = () => {
  const pageSize = usePageSize("recent");
  const [allItems, setAllItems] = useState<Products[]>([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);

  useEffect(() => {
    const fetchPandaMarket = async ({ orderBy, pageSize, page }: Props) => {
      const products = await getPandaMarket({ orderBy, pageSize, page });
      setAllItems(products.list);
      setTotalPageNum(Math.ceil(products.totalCount) / pageSize);
    };

    fetchPandaMarket({ orderBy, pageSize, page });
  }, [orderBy, pageSize, page]);

  // 셀렉트 박스 이벤트 핸들러
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
  };

  // 페이지네이션 이벤트 핸들러
  const handleClickButton = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div id="product-all">
      <div className="product-search-wrap">
        <h2 className="product-tit">전체 상품</h2>
        <Search handleChangeSelect={handleChangeSelect} />
      </div>
      <ul className="product-wrap">
        {allItems?.map((item) => <ItemCard item={item} key={item.id} />)}
      </ul>
      <Pagination
        totalPageNum={totalPageNum}
        activePageNum={page}
        onClick={handleClickButton}
      />
    </div>
  );
};

export default AllProduct;
