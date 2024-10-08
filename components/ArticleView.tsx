import { Article as ArticleType } from "@/types/types";
import styles from "./ArticleView.module.css";
import Kebab from "./Kebab";
import { getTimeDiff } from "@/utils/getTimeDiff";

export default function ArticleView({
  ArticleItem,
}: {
  ArticleItem: ArticleType;
}) {
  const { title, content, likeCount, updatedAt } = ArticleItem;
  // isLiked 나중에 추가
  const nickname = (ArticleItem && ArticleItem.writer.nickname) || "unknown";
  const date = getTimeDiff(updatedAt);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles["article-header"]}>
          <div className={styles["article-title"]}>{title}</div>
          <Kebab />
        </div>
        <div className={styles["nickname-date-like"]}>
          <div className={styles.nickname}>{nickname}</div>
          <div className={styles.date}>{date}</div>
          <div className={styles.like}>{likeCount}</div>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </>
  );
}
