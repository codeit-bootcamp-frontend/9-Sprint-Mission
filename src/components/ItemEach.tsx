import { useEffect, useState } from "react";
import { getItemById } from "../api";
import "./App.css";
import styles from "./styles/ItemEach.module.css";
import heartIcon from "../img/ic_heart.png";
import { TagOnly } from "./TagOnly";
import { Kebab } from "./Kebab";

interface Item {
  name: string;
  price: number;
  description: string;
  tags: string[];
  images: string;
  favoriteCount: number;
}

export function ItemEach({ id }: { id: string }) {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadEachItem = async () => {
    setLoading(true);
    try {
      const itemInfo = await getItemById({ id });
      setItem(itemInfo);
    } catch (err) {
      if (err instanceof Error) setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEachItem();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {item && (
        <div className={styles.productWrapper}>
          <div>
            <img
              className={styles.productImg}
              src={item.images}
              alt={item.name}
              width="486"
              height="486"
            />
          </div>
          <div className={styles.productInfoBox}>
            <div>
              <div className={styles.productHeader}>
                <h1 className={styles.prucuctTitle}>
                  {item.name} 팔아요
                  <Kebab />
                </h1>
                <div className={styles.productPrice}>
                  {item.price.toLocaleString()}원
                </div>
              </div>
              <div className={styles.productDescriptionWrapper}>
                <h2 className={styles.productInfoTitle}>상품 소개</h2>
                <div className={styles.productDecription}>
                  {item.description}
                </div>
                <h2 className={styles.productInfoTitle}>상품 태그</h2>
                <div className={styles.productTags}>
                  {item.tags.map((tag, index) => (
                    <TagOnly value={tag} key={index} />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.extraInfo}>
              <div className={styles.writerProfile}>
                <button type="button" className={styles.sellerProfileBtn}>
                  <div className="blind">판매자 프로필</div>
                  <div className={styles.sellerProfile}></div>
                </button>
                <div className={styles.writerInfo}>
                  <div className={styles.writerId}>총명한 판다</div>
                  <div className={styles.writerDate}>2024.01.22</div>
                </div>
              </div>
              <div className={styles.BtnWrapper}>
                <button type="button" className={styles.favoriteBtn}>
                  <img src={heartIcon} alt="하트" width="32" height="32" />
                  <div>{item.favoriteCount}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
