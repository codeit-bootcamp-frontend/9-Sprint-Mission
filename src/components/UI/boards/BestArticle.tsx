import { ArticleProps } from "@/types/article";
import usePageSize from "@/hooks/usePageSize";
import styles from "./BestArticle.module.scss";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "next/navigation";

const BestArticle = ({ articles }: ArticleProps) => {
  const params = useSearchParams();
  const pageSizeParam = params.get("pageSize");
  const initialPageSize = pageSizeParam ? Number(pageSizeParam) : 3;
  const articleCount = usePageSize(initialPageSize);

  return (
    <section className={styles.bestArticle}>
      <h2 className={styles.title}>베스트 게시글</h2>
      <ul className={styles.articleWrap}>
        {articles.slice(0, articleCount).map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            BestLabel={true}
            ArticleMeta="BestArticleMeta"
          />
        ))}
      </ul>
    </section>
  );
};

export default BestArticle;
