import { useState, useEffect } from "react";
import { getProducts } from "../api/api";
import styles from "./BestProductList.module.css";
import heart from "../assets/heart.png";
import { Link } from "react-router-dom";

const BEST_OPTION = {
  order: "favorite",
  page: 1,
  pageSize: 4,
};

function BestProductListItem({ item }) {
  return (
    <div>
      <Link to={`/items/${item.id}`}>
        <img
          className={styles.itemImage}
          src={item.images}
          alt={item.name}
          width={221}
          height={221}
        />
      </Link>
      <div className={styles.itemDescription}>
        <strong className={styles.itemName}>{item.name}</strong>
        <em className={styles.itemPrice}>{item["price"].toLocaleString()}원</em>
        <em className={styles.itemLike}>
          <img
            className={styles.itemLikeImg}
            src={heart}
            alt="좋아요"
            width={16}
            height={16}
          />
          {item.favoriteCount}
        </em>
      </div>
    </div>
  );
}

function BestProductList({ className }) {
  const [items, setItems] = useState([]);

  const handleLoad = async (option) => {
    const { list } = await getProducts(option);
    setItems(list);
  };

  useEffect(() => {
    handleLoad(BEST_OPTION);
  }, []);

  return (
    <ul className={className}>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <BestProductListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default BestProductList;
