import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../Api";
import ItemBox from "./ItemBox";
import Search from "../../../images/icon/ic_search.svg";
import Paginations from "./Pagination";

function AllItemList() {
  const [itemList, setItemList] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageSize] = useState(10); // 페이지당 제품 수
  const [totalPages, setTotalPages] = useState(0);
  const [order, setOrder] = useState("");

  const sortedItems = [...itemList].sort((a, b) => {
    if (order === "좋아요순") {
      return b.favoriteCount - a.favoriteCount; // 숫자 정렬
    } else if (order === "최신순") {
      return new Date(b.createdAt) - new Date(a.createdAt); // 날짜 정렬
    }
    return 0; // 기본값 (정렬하지 않음)
  });

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts(page, pageSize, order);
      setItemList(data.list);
      setTotalPages(Math.ceil(data.totalCount / pageSize));
    }
    fetchProducts();
  }, [page, pageSize, order]);

  const handleSort = (e) => {
    setOrder(e.target.value);
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="product-wrap">
        <div className="title-wrap">
          <h2 className="list-title">전체 상품</h2>
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
          <button className="btn-prd">
            <Link to="/additem">상품 등록하기</Link>
          </button>
          <div className="item-select">
            <select value={order} onChange={handleSort}>
              <option value="최신순">최신순</option>
              <option value="좋아요순">좋아요순</option>
            </select>
          </div>
        </div>

        <ul className="product-list">
          {sortedItems.map((item) => {
            // item은 배열의 요소
            return (
              <li key={item.id}>
                <ItemBox item={item} />
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
