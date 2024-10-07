import styles from "./IndividualBoard.module.css";
import formData from "@/src/lib/formData";
import heart from "@/src/assets/ic_heart.png";
import profile from "@/src/assets/profile.png";
import { Post } from "@/src/types";
import Image from "next/image";

export default function IndividualBoard({ board }: { board: Post }) {
  return (
    <div className={styles.boardContainer}>
      <strong className={styles.boardTitle}>{board.title}</strong>

      <div className={styles.boardInfo}>
        <ul className={styles.boardDescription}>
          <li>
            <Image src={profile} alt="작성자" width={40} height={40} />
          </li>
          <li className={styles.userNickname}>{board.writer.nickname}</li>
          <li className={styles.createdAt}>{formData(board.createdAt)}</li>
        </ul>
        <button className={styles.likeButton}>
          <Image src={heart} alt="좋아요" width={32} height={32} />
          {board.likeCount}
        </button>
      </div>

      <div className={styles.boardContent}>{board.content}</div>
    </div>
  );
}

/*
1. 좋아요 기능 추가

*/
