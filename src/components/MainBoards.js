import { formatDate } from "../utils/dateUtils";
import Link from "next/link";
import Image from "next/image";
import styles from "./AllBoardList.module.scss";
import userIcon from "@/public/assets/icon/user-icon.png";

export default function MainBoard({ sortedBoards }) {
  return (
    <>
      <ul className={styles["article-wrap"]}>
        {sortedBoards &&
          sortedBoards.map((article) => (
            <li className={styles["article-list"]} key={article.id}>
              <div>
                <div className={styles.content}>
                  <Link href={`/boards/${article.id}`}>{article.content}</Link>
                </div>
                <div className={styles["profile-img"]}>
                  <img src={article.image} alt="작성자 이미지" />
                </div>
              </div>
              <div>
                <div className={styles["user-info"]}>
                  <span className={styles["user-img"]}>
                    <Image src={userIcon} alt="사용자 이미지" />
                  </span>
                  <span className={styles.nickname}>
                    {article.writer.nickname}
                  </span>
                  <span className={styles.date}>
                    {formatDate(article.createdAt)}
                  </span>
                </div>
                <div className={styles.like}>
                  <button>{article.likeCount}</button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
