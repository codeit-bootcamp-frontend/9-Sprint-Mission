import Image from "next/image";
import styles from "@/styles/BestBadge.module.css";

function BestBadge() {
  return (
    <div className={styles.bestBadge}>
      <Image src="/images/ic_medal.svg" alt="메달" width={16} height={16} />
      <span className={styles.badgeTitle}>Best</span>
    </div>
  );
}

export default BestBadge;
