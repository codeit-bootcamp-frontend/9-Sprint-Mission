import { Article } from "@/types/article";
import { formatUpdatedAt } from "@/utils/dateUtils";
import styles from "./ArticleCard.module.scss";
import DefaultProduct from "@/assets/images/ui/img_default.svg";
import BestLabelImg from "@/assets/images/icons/ic_medal.svg";
import LikeCountImg from "@/assets/images/icons/ic_heart.svg";
import UserAvatarImg from "@/assets/images/icons/ic_profile.svg";
import Image from "next/image";
import Link from "next/link";

interface Props {
  article: Article;
  className?: string;
  BestLabel?: boolean;
  UserAvatar?: boolean;
  ArticleMeta?: "BestArticleMeta" | "AllArticleMeta";
}

const ArticleCard = ({
  article,
  className,
  BestLabel,
  UserAvatar,
  ArticleMeta,
}: Props) => {
  const formattedUpdatedAt = formatUpdatedAt(article.updatedAt);

  const Date = () => {
    return <p className={styles.date}>{formattedUpdatedAt}</p>;
  };

  const LikeCount = ({ size }: { size: number }) => {
    return (
      <>
        <Image src={LikeCountImg} width={size} height={size} alt="like" />
        <span className={styles.likeCount}>{article.likeCount}</span>
      </>
    );
  };

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
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div className={styles.articleCardBottom}>
          {UserAvatar && (
            <Image
              src={UserAvatarImg}
              width={24}
              height={24}
              alt={article.writer.nickname}
            />
          )}
          <p className={styles.nickname}>{article.writer.nickname}</p>
          {ArticleMeta === "BestArticleMeta" ? (
            <>
              <LikeCount size={15} />
              <Date />
            </>
          ) : (
            <div className={styles.allArticleMeta}>
              <Date />
              <LikeCount size={24} />
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default ArticleCard;
