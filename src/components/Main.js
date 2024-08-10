import { useEffect, useState } from "react";
import { getProducts } from "../Api.js";
import { ProductList } from "../components/ProductList.js";
import "./Main.css";
import { Pagenation } from "./PageNation.js";
import { Link } from "react-router-dom";

function Main() {
  const [order, setOrder] = useState("recent");
  const [productsTotal, setProductsTotal] = useState([]);
  const [productsFavorite, setProductsFavorite] = useState([]);
  const [page, setPage] = useState(1);

  async function handleLoadTotal(query) {
    const { list } = await getProducts(query);
    setProductsTotal(list);
  }

  async function handleLoadFavorite(query) {
    const { list } = await getProducts(query);
    setProductsFavorite(list);
  }

  const sortedProducts = productsFavorite.sort((a,b) => b[order] - a[order]);
  
  const handleRecentClick = () => setOrder('recent');

  const handleFavoriteClick = () => setOrder('favorite');

  useEffect(() => {
    handleLoadTotal({
      pageSize: 4,
      order: "recent",
      page:1
    });
    handleLoadFavorite({
      pageSize: 10,
      order: order,
      page: page,
    });
  }, [order, page]);

  return (
    <div className="main-container">
      <div className="main-layout">
        <section className="item-container">
          <h2>베스트 상품</h2>
          <ProductList products={productsTotal} title="best" />
        </section>
        <section className="item-container">
          <div className="search-bar">
            <h2>전체 상품</h2> 
            <div className="search-form">
              <div className="search-container">
                <button type="button" className="search-icon"></button>
                <input
                  className="search-input"
                  placeholder="검색할 상품을 입력해주세요"
                ></input>
              </div>
              <Link to="/additem" className="item-add-btn">
                상품 등록하기
              </Link>
              <div className="select-container">
                <button className="select-btn order-btn" type="button">
                  {order === "recent" ? "최신순" : "좋아요순"}
                </button> 
                <div className="order">
                  <button  onClick={handleRecentClick}  type="button" className="order-btn">
                    최신순
                  </button>
                  <button  onClick={handleFavoriteClick} type="button" className="order-btn">
                    좋아요순
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ProductList products={sortedProducts} title="total" />
        </section>
        <Pagenation setPage={setPage} />
      </div>
    </div>
  );
}

export default Main;
