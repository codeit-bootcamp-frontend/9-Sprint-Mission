import { useCallback, useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";
import { NavLink } from "react-router-dom";
import searchIcon from "../img/ic_search.png";
import Container from "./Container";

export function AllItems({ page, pageSize, getTotalPage }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allItems, setAllItems] = useState([]);

  const [orderBy, setOrderBy] = useState("recent");
  const [search, setSearch] = useState("");

  // 부모 컴포넌트로 totalPage를 전달
  const forwardTotalPage = useCallback(
    (totalPage) => {
      getTotalPage(totalPage);
    },
    [getTotalPage]
  );

  const loadAllItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPandaItems({
        page,
        pageSize,
        orderBy,
        search,
      });
      setAllItems(response.list || []);
      const totalPage = Math.floor(response.totalCount / pageSize) + 1;
      forwardTotalPage(totalPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, orderBy, forwardTotalPage]);

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

  //로딩 처리 & 에러 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
    </section>
  );
}

// 검색 후 키워드 리셋됨
