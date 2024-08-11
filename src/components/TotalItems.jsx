import { useState, useEffect } from "react";
import styles from "../assets/styles/TotalItems.module.css";
import getItems from "../api";
import Dropdown from "./Dropdown";

function TotalItems({ currentPage }) {
  const [order, setOrder] = useState("recent"); // or 'recent'
  const [items, setItems] = useState([]);
  const [isDropdownView, setDropdownView] = useState(false);
  const QUERY = { order: order, page: currentPage, pageSize: 10 };

  const handleOrderChange = (e) => setOrder(e.currentTarget.value);

  const handleButtonClick = () => {
    window.location.href = "../../public/additem.html";
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { list } = await getItems(QUERY);
        setItems(list);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, [order, currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.totalItemsHeader}>
        <h1 className={styles.title}>전체상품</h1>
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          className={styles.searchBar}
        />
        <button
          type="button"
          className={styles.registerButton}
          onClick={handleButtonClick}
        >
          상품 등록하기
        </button>
        {order === "favorite" && (
          <button
            type="button"
            onClick={() => {
              setDropdownView(!isDropdownView);
            }}
            className={styles.dropdownButton}
          >
            {isDropdownView ? "좋아요순 ▼" : "좋아요순 ▲"}
            {isDropdownView && <Dropdown onSelect={handleOrderChange} />}
          </button>
        )}
        {order === "recent" && (
          <button
            type="button"
            onClick={() => {
              setDropdownView(!isDropdownView);
            }}
            className={styles.dropdownButton}
          >
            {isDropdownView ? "최신순 ▼" : "최신순 ▲"}
            {isDropdownView && <Dropdown onSelect={handleOrderChange} />}
          </button>
        )}
      </div>

      <div className={styles.itemsWrap}>
        {items.map((item) => {
          return (
            <div key={item.id} className="item">
              <img
                src={item.images[0]}
                className={styles.itemImg}
                alt={item.name}
              />
              <div>
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
