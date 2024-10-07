import Image from "next/image";
import styles from "./ProductItem.module.css";
import formatPrice from "@/utils/formatPrice";
import { Product } from "@/types/types";

interface ProductItemProps {
  item?: Product;
  size?: "small" | "large";
}

function ProductItem({ item, size = "large" }: ProductItemProps) {
  if (!item) {
    return (
      <div className={`${styles.productItem} ${styles[size]}`}>
        <Image
          src="/images/default.svg"
          alt="기본 이미지"
          width="282"
          height="282"
        />
        <p className={styles.itemName}>상품명 없음</p>
        <span className={styles.itemPrice}>가격 없음</span>
        <span className={styles.itemLike}>♡ 0</span>
      </div>
    );
  }

  const imageSrc =
    item.images && item.images.length > 0
      ? item.images[0]
      : "/images/default.svg";
  const itemName = item.name || "상품명 없음";
  const price = item.price >= 0 ? formatPrice(item.price) : "가격 없음";
  const favoriteCount = item.favoriteCount >= 0 ? item.favoriteCount : 0;

  return (
    <div className={`${styles.productItem} ${styles[size]}`}>
      <Image src={imageSrc} alt="상품 이미지" width="282" height="282" />
      <p className={styles.itemName}>{itemName}</p>
      <span className={styles.itemPrice}>{price}원</span>
      <span className={styles.itemLike}>♡ {favoriteCount}</span>
    </div>
  );
}

export default ProductItem;
