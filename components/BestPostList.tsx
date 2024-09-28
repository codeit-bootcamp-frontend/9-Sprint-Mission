import { useEffect, useState } from "react";
import styles from "./BestPostList.module.css";
import Image from "next/image";
import axios from "@/lib/axios";
import timeDiff from "@/utils/timeDiff";
import UserNickname from "./UserNickname";
import LikeCount from "./LikeCount";
import CreatedDate from "./CreatedDate";
import { Articles } from "@/types/types";

export default function BestPostList() {
  const [articles, setArticles] = useState<Articles[]>();

  async function getArticles() {
    const res = await axios.get("/articles?orderBy=like");
    const articles = res.data.list ?? [];
    setArticles(articles);
  }
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <section className={styles["best-section"]}>
        <h2 className={styles["best-title"]}>베스트 게시글</h2>
        <ul className={styles["article-container"]}>
          {articles &&
            articles.map((article) => (
              <li key={article.id} className={styles.article}>
                <Image src="/img_badge.png" width={102} height={30} alt="" />
                <div className={styles["content-container"]}>
                  <div className={styles["article-content"]}>
                    {article.content}
                  </div>
                  <div className={styles["article-img"]}>
                    <Image src={article.image} width={48} height={48} alt="" />
                  </div>
                </div>
                <div className={styles["info-container"]}>
                  <div className={styles["article-info"]}>
                    <UserNickname className={styles["user-nickname"]}>
                      {article.writer.nickname}
                    </UserNickname>
                    <LikeCount className={styles["like-count"]}>
                      <Image
                        src="/ic_heart (2).png"
                        width={16}
                        height={16}
                        alt=""
                      />
                      {article.likeCount}
                    </LikeCount>
                  </div>
                  <CreatedDate className={styles["created-at"]}>
                    {timeDiff(article.createdAt)}
                    </CreatedDate>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
