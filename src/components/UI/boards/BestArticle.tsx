import axios from "axios";
import { useEffect, useState } from "react";
import { getArticles } from "@/api/article";
import { Article } from "@/types/article";
import usePageSize from "@/hooks/usePageSize";
import styles from "./BestArticle.module.scss";
import BestArticleCard from "./BestArticleCard";

const BestArticle = () => {
  const pageSize = usePageSize("like");
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchBestArticles = async () => {
      try {
        const data = await getArticles({ orderBy: "like", pageSize });
        setArticles(data.list);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.status, error.message);
        } else {
          throw new Error("에러가 발생했습니다.");
        }
      }
    };

    fetchBestArticles();
  }, [pageSize]);

  return (
    <section className={styles.bestArticle}>
      <h2 className={styles.title}>베스트 게시글</h2>
      <ul className={styles.articleWrap}>
        {articles?.map((article) => (
          <BestArticleCard key={article.id} article={article} />
        ))}
      </ul>
    </section>
  );
};

export default BestArticle;
