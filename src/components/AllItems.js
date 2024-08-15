import { useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";
import { NavLink } from "react-router-dom";
import searchIcon from "../img/ic_search.png";

export function AllItems() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allItems, setAllItems] = useState([]);

  const [search, setSearch] = useState("");

  const loadAllItems = async () => {
    setLoading(true);

    try {
      const response = await getPandaItems({
        page: 1,
        pageSize: 10,
        orderBy: "recent",
        search: "",
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

  useEffect(() => {
    loadAllItems();
  }, [search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <h2 className="section-title">
        <div>전체 상품</div>
        <div className="option-wrapper">
          <form onSubmit={handleSearchSubmit}>
            <div className="search-wrapper">
              <img src={searchIcon} alt="검색아이콘" width="24" height="24" />
              <input
                className="search-input"
                name="search"
                placeholder="검색할 상품을 입력해주세요"
              ></input>
            </div>
          </form>
          <NavLink to="/additem">
            <button type="button" className="add-btn">
              상품 등록하기
            </button>
          </NavLink>
        </div>
      </h2>
      <div className="all-items">
        <PandaItemList items={allItems} />;
      </div>
    </section>
  );
}
