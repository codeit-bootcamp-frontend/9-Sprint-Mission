import { Link } from "react-router-dom";
import heart from "../assets/heart.png";
import styles from "./AllProductList.module.css";

function AllProductListItem({ item }) {
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

function AllProductList({ items, className }) {
  return (
    <ul className={className}>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <AllProductListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default AllProductList;
