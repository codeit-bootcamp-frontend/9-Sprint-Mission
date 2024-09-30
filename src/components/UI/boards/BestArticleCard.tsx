import { Article, ArticleProps } from "@/types/article";
import { formatUpdatedAt } from "@/utils/dateUtils";
import styles from "./BestArticleCard.module.scss";
import BestLabel from "@/assets/images/icons/ic_medal.svg";
import LikeCount from "@/assets/images/icons/ic_heart.svg";
import Image from "next/image";
import Link from "next/link";

const BestArticleCard = <T extends Article>({ article }: ArticleProps<T>) => {
  const formattedUpdatedAt = formatUpdatedAt(article.updatedAt);

  return (
    <li className={styles.articleCard}>
      <Link href={`/boards/${article.id}`} className={styles.articleLink}>
        <span
          className={styles.bestLabel}
          style={{ backgroundImage: `url(${BestLabel.src})` }}
        >
          Best
        </span>
        <div className={styles.titleWrap}>
          <h3 className={styles.articleCardTitle}>{article.title}</h3>
          <div className={styles.articleCardImageWrap}>
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.articleCardBottom}>
          <p className={styles.nickname}>{article.writer.nickname}</p>
          <Image src={LikeCount} width={15} height={15} alt="like" />
          <span className={styles.likeCount}>{article.likeCount}</span>
          <p className={styles.date}>{formattedUpdatedAt}</p>
        </div>
      </Link>
    </li>
  );
};

export default BestArticleCard;
