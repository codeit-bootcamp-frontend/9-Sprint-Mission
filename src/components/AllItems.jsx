import { useCallback, useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";
import { NavLink } from "react-router-dom";
import searchIcon from "../img/ic_search.png";
import Container from "./Container";
import { PagenationBtn } from "./Pagenation";

export function AllItems({ width }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allItems, setAllItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션 버튼을 누르면 setCurrentPage()
  const [pageSize, setPageSize] = useState(10); // 윈도우 너비 width를 받아왔음 -> pageSize setter 호출하기
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [totalPage, setTotalPage] = useState(0);

  const loadAllItems = useCallback(async () => {
    setLoading(true);

    // width가 변경될 때마다 pageSize 업데이트
    if (width <= 780) {
      setPageSize(4);
    } else if (width <= 991 && width > 781) {
      setPageSize(6);
    } else {
      setPageSize(10); // 기본값
    }

    try {
      const response = await getPandaItems({
        currentPage,
        pageSize,
        orderBy,
        search,
      });
      setAllItems(response.list || []);
      setTotalPage(Math.floor(response.totalCount / pageSize) + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, search, orderBy, width]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value.trim());
  };

  const handleOrderChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
  };

  useEffect(() => {
    loadAllItems();
  }, [loadAllItems]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section id="section-all">
      <div className="section-title-wrapper">
        <h2>전체 상품</h2>
        <form className="item-option" onSubmit={handleSearchSubmit}>
          {/* 상품 검색 */}
          <div className="search-wrapper">
            <img src={searchIcon} alt="검색아이콘" width="24" height="24" />
            <input
              className="search-input"
              name="search"
              placeholder="검색할 상품을 입력해주세요"
            ></input>
          </div>
          {/* 상품 등록 버튼 */}
          <NavLink to="/additem">
            <button type="button" className="add-btn">
              상품 등록하기
            </button>
          </NavLink>
          {/* 정렬 기준 드롭다운 */}
          <Container currentOrder={orderBy} onOrderChange={handleOrderChange} />
        </form>
      </div>
      {/* 아이템 보여주기 */}
      <div className="all-items">
        <PandaItemList items={allItems} />
      </div>
      <PagenationBtn
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
