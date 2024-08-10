import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import PagiNation from "./PagiNation";
import { getProducts } from "../api";
import logo from "../image/logo.png";
import profile from "../image/profile.png";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [page, setPage] = useState(1);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const bestItems = [...items].sort(
    (a, b) => b.favoriteCount - a.favoriteCount
  );

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleLoad = async (option) => {
    const { list } = await getProducts(option);
    setItems(list);
  };

  const handlePageLoad = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    handleLoad({ order, page, pageSize: 10 });
  }, [order, page]);

  return (
    <>
      <header className="header-container">
        <h1 className="header-logo-container">
          <a className="header-logo-link" href="./items">
            <img
              className="header-logo"
              src={logo}
              alt="판다마켓"
              width={153}
              height={51}
            />
          </a>
        </h1>
        <div className="header-items">
          <a className="header-item" href="./">
            자유게시판
          </a>
          <a className="header-item" href="./">
            중고마켓
          </a>
        </div>
        <button className="header-profile">
          <img
            className="header-profile-img"
            src={profile}
            alt="프로필"
            width={40}
            height={40}
          />
        </button>
      </header>
      <main className="main-container">
        <section className="best-product-container">
          <h2 className="best-product-title">베스트 상품</h2>
          <ProductList
            className="best-product-list"
            items={bestItems.slice(0, 4)}
          />
        </section>
        <section className="all-product-container">
          <div className="all-product-navigation">
            <h2 className="all-product-title">전체 상품</h2>
            <div className="all-product-manu">
              <input
                className="all-product-search"
                placeholder="검색할 상품을 입력해주세요"
              />
              <a className="all-product-regist" href="/additem">
                상품 등록하기
              </a>
              <select
                className="all-product-orders"
                onChange={handleOrderChange}
              >
                <option value="createdAt">최신순</option>
                <option value="favoriteCount">좋아요순</option>
              </select>
            </div>
          </div>
          <ProductList className="all-product-list" items={sortedItems} />
          <div className="pagenation-container">
            <PagiNation onPageChange={handlePageLoad} />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
