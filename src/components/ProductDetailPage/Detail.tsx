import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import DetailComments from "./DetailComments";
import { StateDetail } from "../../types/Detail";

function Detail() {
  const { productId } = useParams<{ productId: string }>();

  const [stateDetail, setStateDetail] = useState<StateDetail>({});

  const createdAt = stateDetail.createdAt?.split("T")[0];
  const tagsList = Array.isArray(stateDetail.tags) ? (
    <ul className={styles.tagList}>
      {stateDetail.tags.map((tag, index) => (
        <li key={index}># {tag}</li>
      ))}
    </ul>
  ) : null;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/products/${productId}`
        );
        const data = await response.json();
        setStateDetail(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDetail();
  }, [productId]);

  return (
    <div className={styles.detail}>
      <div className="wrap_inner">
        <div className={styles.detailWrap}>
          <div className={styles.detailImg}>
            <img
              src={stateDetail.images}
              width={486}
              height={486}
              alt="상품 이미지"
            />
          </div>
          <div className={styles.detailInfo}>
            <p className={styles.prdName}>{stateDetail.name}</p>
            <p className={styles.prdPrice}>{stateDetail.price}</p>
            <div className={styles.prdInfo}>
              <span className={styles.prdInfoTit}>상품 소개</span>
              <p className={styles.description}>{stateDetail.description}</p>
              <span className={`${styles.prdInfoTit} ${styles.tagTit}`}>
                상품 태그
              </span>
              {tagsList}
            </div>
            <div className={styles.ownerWrap}>
              <span className={styles.ownerIcon}></span>
              <div className={styles.ownerInfo}>
                <p className={styles.ownerId}>총명한판다</p>
                <p className={styles.date}>{createdAt}</p>
              </div>
              <button type="button" className={styles.btnFavorite}>
                <span className={styles.favorite}>
                  {stateDetail.favoriteCount}
                </span>
              </button>
            </div>
          </div>
        </div>
        <DetailComments productId={productId} />
        <button type="button" className={styles["btn-back"]}>
          <Link to="/items">목록으로 돌아가기</Link>
        </button>
      </div>
    </div>
  );
}
export default Detail;
