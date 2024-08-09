import { useState, useEffect } from "react";
import styles from "../assets/styles/TotalItems.module.css";
import getItems from "../api";

function TotalItems() {
  const ORDER = { order: "recent", page: 1, pageSize: 10 };
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { list } = await getItems(ORDER);
        setItems(list);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.totalItemsHeader}>
        <h1 className={styles.title}>전체상품</h1>
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          className={styles.searchBar}
        />
        <button type="submit" className={styles.registerButton}>
          상품 등록하기
        </button>
        <button type="button" className={styles.dropdownButton}></button>
      </div>

      <div className={styles.itemsWrap}>
        {items.map((item) => {
          return (
            <div className="item">
              <img src={item.images[0]} className={styles.itemImg} />
              <div key={item.id}>
                <p className={styles.itemDescription}>{item.description}</p>
                <h2 className={styles.itemPrice}>{item.price}원</h2>
                <div className={styles.itemGoodWrap}>
                  <button className={styles.itemGoodButton} />
                  <span className={styles.itemFavoriteCount}>
                    {item.favoriteCount}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TotalItems;
