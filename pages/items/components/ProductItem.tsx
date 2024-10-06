import Image from "next/image";
import styles from "./ProductItem.module.css";
import formatPrice from "@/utils/formatPrice";

function ProductItem({ item, size = "large" }) {
  return (
    <div className={`${styles.productItem} ${styles[size]}`}>
      <Image
        src={item.images[0] || "/images/default.svg"}
        alt="상품 이미지"
        width="282"
        height="282"
      />
      <p className={styles.itemName}>{item.name}</p>
      <span className={styles.itemPrice}>{formatPrice(item.price)}원</span>
      <span className={styles.itemLike}>♡ {item.favoriteCount}</span>
    </div>
  );
}

export default ProductItem;
