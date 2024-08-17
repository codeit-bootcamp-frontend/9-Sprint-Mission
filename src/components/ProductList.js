import heart from "../assets/heart.png";
import styles from "./ProductList.module.css";

function formatPrice(value) {
  return `${value.toLocaleString()}원`;
}

function ProductListItem({ item }) {
  return (
    <div>
      <img
        className={styles.itemImage}
        src={item.images}
        alt={item.name}
        width={221}
        height={221}
      />
      <div className={styles.itemDescription}>
        <strong className={styles.itemName}>{item.name}</strong>
        <em className={styles.itemPrice}>{formatPrice(item.price)}</em>
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

function ProductList({ items, className }) {
  return (
    <ul className={className}>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ProductListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default ProductList;
