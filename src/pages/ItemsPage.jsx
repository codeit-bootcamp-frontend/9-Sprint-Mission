import { useState, useEffect } from "react";
import { getProducts } from "../api/api";
import { Link } from "react-router-dom";
import BestProductList from "../components/BestProductList";
import AllProductList from "../components/AllProductList";
import PagiNation from "../components/PagiNation";
import styles from "./ItemsPage.module.css";

const INITIAL_PAGESIZE = 10;

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(INITIAL_PAGESIZE);

  //API 데이터 요청
  const handleLoad = async (option) => {
    const { list } = await getProducts(option);
    setItems(list);
  };

  //정렬 바꾸기
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  useEffect(() => {
    handleLoad({ order, page, pageSize: INITIAL_PAGESIZE });
  }, [order, page]);

  //페이지네이션 구현 필요

  return (
    <>
      <main className={styles.mainContainer}>
        <section className={styles.bestProductContainer}>
          <h2 className={styles.bestProductTitle}>베스트 상품</h2>
          <BestProductList className={styles.bestProductList} />
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
                <option value="recent">최신순</option>
                <option value="favorite">좋아요순</option>
              </select>
            </div>
          </div>
          <AllProductList className={styles.allProductList} items={items} />
          <div className={styles.pagenationContainer}>
            <PagiNation
              totalItems={items.length}
              pageSize={pageSize}
              page={page}
              setPage={setPage}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default ItemsPage;
