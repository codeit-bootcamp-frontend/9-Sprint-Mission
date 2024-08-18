import { useState, useEffect } from "react";
import { getProducts } from "../api/api";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import PagiNation from "../components/PagiNation";
import styles from "./ItemPage.module.css";

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [page, setPage] = useState(1);

  const bestItems = [...items].sort(
    (a, b) => b.favoriteCount - a.favoriteCount
  );

  const handleOrderChange = (e) => {
    console.log(e.target.value);
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
      <main className={styles.mainContainer}>
        <section className={styles.bestProductContainer}>
          <h2 className={styles.bestProductTitle}>베스트 상품</h2>
          <ProductList
            className={styles.bestProductList}
            items={bestItems.slice(0, 4)}
          />
        </section>
        <section className={styles.allProductContainer}>
          <div className={styles.allProductNavigation}>
            <h2 className={styles.allProductTitle}>전체 상품</h2>
            <div className={styles.allProductManu}>
              <input
                className={styles.allProductSearch}
                placeholder="검색할 상품을 입력해주세요"
              />
              <Link to="/additem" className={styles.allProductRegist}>
                상품 등록하기
              </Link>
              <select
                className={styles.allProductOrders}
                onChange={handleOrderChange}
              >
                <option value="createdAt">최신순</option>
                <option value="favoriteCount">좋아요순</option>
              </select>
            </div>
          </div>
          <ProductList className={styles.allProductList} items={items} />
          <div className={styles.pagenationContainer}>
            <PagiNation onPageChange={handlePageLoad} />
          </div>
        </section>
      </main>
    </>
  );
}

export default ItemsPage;
