import Button from "./Button";
import styles from "@/components/TotalPostList.module.css";
import SearchForm from "./SearchForm";
import Dropdown from "./Dropdown";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { Articles } from "@/types/types";
import { useState } from "react";
import UserNickname from "./UserNickname";
import CreatedDate from "./CreatedDate";
import LikeCount from "./LikeCount";
import Image from "next/image";
import timeDiff from "@/utils/timeDiff";

export default function TotalPostList() {
  const [articles, setArticles] = useState<Articles[]>();

  async function getArticles() {
    const res = await axios.get("/articles");
    const articles = res.data.list ?? [];
    setArticles(articles);
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <section>
        <div className={styles["total-title-container"]}>
          <h2>게시글</h2>
          <Button>글쓰기</Button>
        </div>
        <div className={styles["form-container"]}>
          <SearchForm className={styles["search-form"]} />
          <Dropdown />
        </div>
        <ul className={styles["article-wrap"]}>
          {articles &&
            articles.map((article) => (
              <li key={article.id} className={styles["article-container"]}>
                <div className={styles["content-container"]}>
                  <div className={styles["article-content"]}>
                    {article.content}
                  </div>
                  <div className={styles["article-img"]}>
                    <Image
                      src={article.image ? article.image : "/ic_search.png"}
                      width={48}
                      height={48}
                      alt=""
                    />
                  </div>
                </div>
                <div className={styles["info-container"]}>
                  <div className={styles["user-info"]}>
                    <Image src="/ic_profile.png" width={24} height={24} alt="" />
                    <UserNickname className={styles["user-nickname"]}>
                      {article.writer.nickname}
                    </UserNickname>
                    <CreatedDate className={styles["created-at"]}>
                      {timeDiff(article.createdAt)}
                    </CreatedDate>
                  </div>
                  <div className={styles["like-count-container"]}>
                    <Image src="/ic_heart.png" width={24} height={24} alt="" />
                    <LikeCount className={styles["like-count"]}>
                      {article.likeCount}
                    </LikeCount>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
