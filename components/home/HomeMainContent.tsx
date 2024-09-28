// HomeMainContent.tsx
import styles from "./HomeMainContent.module.css";
import Image from "next/image";

interface HomeMainContentProps {
  src: string;
  subtitle: string;
  title: string;
  content: string;
  position?: string;
}

const HomeMainContent = ({
  src,
  subtitle,
  title,
  content,
  position,
}: HomeMainContentProps) => {
  return (
    <div
      className={`${styles.styledMainContent} ${
        position === "right" ? styles.right : ""
      }`}
    >
      <Image
        className={styles.mainImage}
        src={src}
        width="579"
        height="444"
        alt="설명 사진"
      />
      <div className={styles.mainContent}>
        <span className={styles.subtitle}>{subtitle}</span>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default HomeMainContent;
