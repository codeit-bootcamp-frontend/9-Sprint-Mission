import { ReactNode } from "react";
import styles from "./HomeCategory.module.css";

interface HomeCategoryProps {
  badge: string;
  title: ReactNode;
  description: ReactNode;
  img: string;
  isReversed?: boolean;
}

export default function HomeCategory({
  badge,
  title,
  description,
  img,
  isReversed = false,
}: HomeCategoryProps) {

  return (
    <div className={styles["category-container"]}>
      {isReversed ? (
        <>
          <div className={styles["category-title-container"]}>
            <span className={styles.badge}>{badge}</span>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
          </div>
          <img src={img} alt="" className={styles["category-img"]} />
        </>
      ) : (
        <>
          <img src={img} alt="" className={styles["category-img"]} />
          <div className={styles["category-title-container"]}>
            <span className={styles.badge}>{badge}</span>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
          </div>
        </>
      )}
    </div>
  );
}
