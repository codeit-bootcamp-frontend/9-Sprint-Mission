import useAxios from "@/hooks/useAxios";
import { Article as ArticleType } from "@/types/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./ArticleView.module.css";

export default function ArticleView() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, setLoading } = useAxios<ArticleType>(`articles/${id}`);

  useEffect(() => {
    if (!data && !loading) setLoading(true);
  }, [id]);

  if (loading || !data) return <div>Loading...</div>;

  const { title, content, likeCount, updatedAt } = data as ArticleType;
  // isLiked 나중에 추가
  const nickname = (data && data.writer.nickname) || "unknown";
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles["article-header"]}>
          <div className={styles["article-title"]}>{title}</div>
          <div className={styles.kebab}>
            <span className={styles.hidden}>더보기</span>{" "}
          </div>
        </div>
        <div className={styles["nickname-date-like"]}>
          <div className={styles.nickname}>{nickname}</div>
          <div className={styles.date}>{updatedAt}</div>
          <div className={styles.like}>{likeCount}</div>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </>
  );
}
