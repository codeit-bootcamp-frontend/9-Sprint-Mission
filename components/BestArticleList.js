import { formatDate } from "../utils/dateUtils";
import Link from "next/link";
import styles from "./AllArticleList.module.scss";
import Image from "next/image";
import Badge from "@/public/assets/icon/ic_badge_best.png";

export default function BestArticleList({ bestArticles }) {
  return (
    <>
      <ul className={`${styles["article-wrap"]} ${styles["best"]}`}>
        {bestArticles &&
          bestArticles.map((article) => (
            <li className={styles["article-list"]} key={article.id}>
              <span className={styles["badge-best"]}>
                <Image src={Badge} width={102} height={30} />
              </span>
              <div>
                <div className={styles.content}>
                  <Link href={`/boards/${bestArticles.id}`}>
                    {article.content}
                  </Link>
                </div>
                <div className={styles["profile-img"]}>
                  <img src={article.image} width={48} />
                </div>
              </div>
              <div>
                <div className={styles["user-info"]}>
                  <span className={styles.nickname}>
                    {article.writer.nickname}
                  </span>
                  <span className={styles.like}>{article.likeCount}</span>
                </div>
                <div className={styles.date}>
                  {formatDate(article.createdAt)}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
