import { useState, useEffect } from "react";
import styles from "../assets/styles/BestItems.module.css";
import getItems from "../api";

function BestItems() {
  const Query = { order: "favorite", page: 1, pageSize: 4 };
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { list } = await getItems(Query);
        setItems(list);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>베스트 상품</h1>
      <div className={styles.itemsWrap}>
        {items.map((item) => {
          return (
            <div key={item.id}>
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

export default BestItems;
