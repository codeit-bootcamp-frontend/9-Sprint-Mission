import { BoardList } from "./Board";
import Image from "next/image";
import styles from "@/components/BoardItem.module.css";
import formatDate from "@/lib/formatDate";
import profile from "@/public/assets/profile.svg";

interface ItemProps {
  board: BoardList;
}

export default function Item({ board }: ItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.titleImageWrap}>
        <h3 className={styles.title}>{board.title}</h3>
        {board.image && (
          <div className={styles.itemImage}>
            <Image fill src={board.image} alt={board.title} />
          </div>
        )}
      </div>
      <div className={styles.nameDateLikeWrap}>
        <div className={styles.profileNameDateWrap}>
          <div className={styles.profile}>
            <Image fill src={profile} alt="프로필" />
          </div>
          <p className={styles.nickname}>{board.writer.nickname}</p>
          <p className={styles.date}>{formatDate(board.updatedAt)}</p>
        </div>
        <p className={styles.likeCount}>♡ {board.likeCount}</p>
      </div>
    </div>
  );
}
