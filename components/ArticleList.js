import { formatDate } from "../utils/dateUtils";
import Link from "next/link";
import styles from "./AllArticleList.module.scss";
import Image from "next/image";
import userIcon from "@/public/assets/icon/user-icon.png";

export default function ArticleList({ articles = [] }) {
  return (
    <>
      <ul className={styles["article-wrap"]}>
        {articles &&
          articles.map((article) => (
            <li className={styles["article-list"]} key={article.id}>
              <div>
                <div className={styles.content}>
                  <Link href={`/boards/${articles.id}`}>{article.content}</Link>
                </div>
                <div className={styles["profile-img"]}>
                  <img src={article.image} />
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
                <div className={styles.like}>{article.likeCount}</div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
