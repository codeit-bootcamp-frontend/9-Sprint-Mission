import heartImg from "../assets/heart.png";
import profileImg from "../assets/profile.png";
import styles from "./ItemDetail.module.css";

function ItemDetail({ item }) {
  return (
    <ul className={styles["item-detail-container"]}>
      <img
        className={styles["item-images"]}
        src={item.images}
        alt={item.name}
        width={486}
        height={486}
      />
      <div className={styles["item-detail"]}>
        <li className={styles["item-name"]}>{item.name}</li>
        {/* 가격에 item["price"].toLocaleString() 하면 에러가 왜 날까요..?*/}
        <li className={styles["item-price"]}>{item["price"]}원</li>
        <hr className={styles.hr} />
        <strong className={styles["container-label"]}>상품 소개</strong>
        <li className={styles["item-description"]}>{item.description}</li>
        <strong className={styles["container-label"]}>상품 태그</strong>
        {item.tag && <li className={styles["item-tag"]}>{item.tag}</li>}

        <div className={styles["seller-container"]}>
          <img src={profileImg} alt="프로필" width={40} height={40} />
          <div className={styles["seller-detail"]}>
            {/* 데이터에 판매자 닉네임이 없습니다 */}
            <em className={styles["seller-name"]}>총명한 판다</em>
            {/* 날짜도 item["createdAt"].toLocaleDateString() 하면 에러가 왜 날까요..?*/}
            <em className={styles["seller-date"]}>{item["createdAt"]}</em>
          </div>
        </div>
        <button className={styles["item-favorite-count"]}>
          {/* 피그마 이미지를 보면 소수점으로 크기가 주어지는데 그대로 하면 되겠죠? */}
          <img src={heartImg} alt="좋아요" width={26.8} height={23.3} />
          {item.favoriteCount}
        </button>
      </div>
    </ul>
  );
}

export default ItemDetail;
