import { Article } from "@/types/article";
import styles from "./ArticleCard.module.scss";
import DefaultProduct from "@/assets/images/ui/img_default.svg";
import BestLabelImg from "@/assets/images/icons/ic_medal.svg";
import UserAvatarImg from "@/assets/images/icons/ic_profile.svg";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "../Button/LikeButton";
import Date from "../Date";
import Profile from "../Profile";

interface Props {
  article: Article;
  className?: string;
  BestLabel?: boolean;
  ArticleMeta?: "BestArticleMeta" | "AllArticleMeta";
}

const ArticleCard = ({ article, className, BestLabel, ArticleMeta }: Props) => {
  return (
    <li className={`${styles.articleCard} ${className}`}>
      <Link href={`/boards/${article.id}`} className={styles.articleLink}>
        {BestLabel && (
          <span
            className={styles.bestLabel}
            style={{ backgroundImage: `url(${BestLabelImg.src})` }}
          >
            Best
          </span>
        )}
        <div className={styles.titleWrap}>
          <h3 className={styles.articleCardTitle}>{article.title}</h3>
          <div className={styles.articleCardImageWrap}>
            <Image
              src={article.image || DefaultProduct}
              alt={article.title}
              fill
            />
          </div>
        </div>
        <div className={styles.articleCardBottom}>
          <Profile nickname={article.writer.nickname} size={24} />
          {ArticleMeta === "BestArticleMeta" ? (
            <>
              <LikeButton size={15} likeCount={article.likeCount} isLiked />
              <Date date={article.updatedAt} />
            </>
          ) : (
            <div className={styles.allArticleMeta}>
              <Date date={article.updatedAt} />
              <LikeButton
                size={24}
                likeCount={article.likeCount}
                isLiked
                fontSize="large"
              />
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default ArticleCard;
