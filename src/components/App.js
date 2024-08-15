import "./App.css";

import { useState, useEffect } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";
import { Header } from "./Header";
import { NavLink } from "react-router-dom";
import searchIcon from "../img/ic_search.png";

function App() {
  const [bestItems, setBestItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  const handleLoad = async () => {
    setLoading(true);
    try {
      const [bestItemsReponse, allItemsReponse] = await Promise.all([
        getPandaItems({
          page: 1,
          pageSize: 4,
          orderBy: "favorite",
          search: "",
        }),
        getPandaItems({
          page: 1,
          pageSize: 10,
          orderBy: "recent",
          search: search,
        }),
      ]);

      setBestItems(bestItemsReponse.list || []);
      setAllItems(allItemsReponse.list || []);
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
    handleLoad(search);
  }, [search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <main>
        <section>
          <h2 className="section-title">
            <div>베스트 상품</div>
          </h2>
          <div className="best-items">
            <PandaItemList items={bestItems} />
          </div>
        </section>
        <section>
          <h2 className="section-title">
            <div>전체 상품</div>
            <div className="option-wrapper">
              <form onSubmit={handleSearchSubmit}>
                <div className="search-wrapper">
                  <img
                    src={searchIcon}
                    alt="검색아이콘"
                    width="24"
                    height="24"
                  />
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
            <PandaItemList items={allItems} />
          </div>
        </section>
        <div className="page-bar"></div>
      </main>
    </>
  );
}
export default App;
