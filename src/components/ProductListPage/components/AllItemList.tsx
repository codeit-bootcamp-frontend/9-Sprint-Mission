import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../Api";
import ItemBox from "./ItemBox";
import Search from "../../../images/icon/ic_search.svg";
import Paginations from "./Pagination";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1200) {
    return 6;
  } else {
    return 10;
  }
};
function AllItemList() {
  const [itemList, setItemList] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageSize, setPageSize] = useState(getPageSize());
  const [totalPages, setTotalPages] = useState(0);
  const [order, setOrder] = useState("recent");

  const handleSort = (e) => {
    const userSelect = e.target.value;
    if (userSelect === "recent") {
      setOrder("recent");
    } else {
      setOrder("favorite");
    }
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    async function fetchProducts() {
      const { list, totalCount } = await getProducts(page, pageSize, order);
      setItemList(list);
      setTotalPages(Math.ceil(totalCount / pageSize));
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
        <div className="title-wrap">
          <h2 className="pagetitle list-title">전체 상품</h2>
          <div className="search">
            <form method="get" action="">
              <div className="search-box">
                <input
                  type="text"
                  className="input-search"
                  placeholder="검색할 상품을 입력해 주세요"
                />
                <input
                  type="image"
                  src={Search}
                  alt="검색"
                  className="btn-search"
                />
              </div>
            </form>
          </div>
          <button className="btn-prd" type="submit">
            <Link to="/additem">상품 등록하기</Link>
          </button>
          <div className="item-select">
            <select onChange={handleSort}>
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>
        <ul className="product-list">
          {itemList.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`${item.id}`}>
                  <ItemBox item={item} />
                </Link>
              </li>
            );
          })}
        </ul>
        <Paginations
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

export default AllItemList;
