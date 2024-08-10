import { useEffect, useState } from "react";
import { getProducts } from "../Api.js";
import { ProductList } from "../components/ProductList.js";
import "./Main.css";
import { Pagenation } from "./PageNation.js";

function Main() {
  const [products, setProducts] = useState([]);
  const [productsF, setProductsF] = useState([]);

  async function handleLoad(query) {
    const { list } = await getProducts(query);
    setProducts(list);
  }

  async function handleLoadF(query) {
    const { list } = await getProducts(query);
    setProductsF(list);
  }

  useEffect(() => {
    handleLoad({
      pageSize: 4,
      order: "recent",
    });
    handleLoadF({
      pageSize: 10,
      order: "favorite",
    });
  }, []);

  return (
    <div className="main-container">
      <div className="main-layout">
        <section className="item-container">
          <h2>베스트 상품</h2>
          <ProductList products={products} title="best" />
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
              <button className="item-add-btn">상품 등록하기</button>
              <div className="select-container">
                <button className="select-btn order-btn" type="button">
                  최신순
                </button>
                <div className="order">
                  <button type="button" className="order-btn">
                    최신순
                  </button>
                  <button type="button" className="order-btn">
                    좋아요순
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ProductList products={productsF} title="total" />
        </section>
        <Pagenation />
      </div>
    </div>
  );
}

export default Main;
