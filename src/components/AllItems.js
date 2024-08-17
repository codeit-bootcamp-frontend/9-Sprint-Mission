import { useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";
import { NavLink } from "react-router-dom";
import searchIcon from "../img/ic_search.png";
import Container from "./Container";

export function AllItems({ width }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allItems, setAllItems] = useState([]);

  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("recent");

  const loadAllItems = async () => {
    setLoading(true);

    try {
      const response = await getPandaItems({
        page: 1,
        pageSize: 10,
        orderBy,
        search,
      });
      setAllItems(response.list || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value.trim());
  };

  const handleOrderChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
  };

  useEffect(() => {
    loadAllItems();
  }, [search, orderBy]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getVisibleItemsCount = () => {
    if (width <= 780) return 4;
    if (width <= 991) return 6;
    return 10;
  };

  const visibleItemsCount = getVisibleItemsCount();
  const visibleItems = allItems.slice(0, visibleItemsCount);

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
        <PandaItemList items={visibleItems} />;
      </div>
    </section>
  );
}
