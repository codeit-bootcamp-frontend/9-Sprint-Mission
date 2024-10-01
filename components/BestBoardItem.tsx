import styles from "@/components/BestBoardItem.module.css";
import formatDate from "@/lib/formatDate";
import bestBedge from "@/public/assets/best-badge.svg";
import Image from "next/image";
import { Board } from "@/components/BestBoard";

interface BestBoardItemProps {
  bestBoard: Board;
}

export default function BestBoardItem({ bestBoard }: BestBoardItemProps) {
  return (
    <li>
      <div className={styles.contentContainer}>
        <div className={styles.bestBedge}>
          <Image fill src={bestBedge} alt="베스트" />
        </div>
        <div className={styles.titleImageWrap}>
          <h3 className={styles.itemTitle}>{bestBoard.title}</h3>
          <div className={styles.itemImage}>
            <Image fill src={bestBoard.image} alt={bestBoard.title} />
          </div>
        </div>
        <div className={styles.nameLikeDateWrap}>
          <div className={styles.nameLikeWrap}>
            <p>{bestBoard.writer.nickname}</p>
            <p>♡ {bestBoard.likeCount}</p>
          </div>
          <p>{formatDate(bestBoard.updatedAt)}</p>
        </div>
      </div>
    </li>
  );
}
