import { formatUpdatedAt } from "@/utils/dateUtils";
import { Article, ArticleProps } from "@/types/article";
import styles from "./AllArticleCard.module.scss";
import DefaultProduct from "@/assets/images/ui/img_default.svg";
import LikeCount from "@/assets/images/icons/ic_heart.svg";
import UserAvatar from "@/assets/images/icons/ic_profile.svg";
import Image from "next/image";
import Link from "next/link";

const AllArticleCard = <T extends Article>({ article }: ArticleProps<T>) => {
  const formattedUpdatedAt = formatUpdatedAt(article.updatedAt);

  return (
    <li className={styles.articleCard}>
      <Link href={`/boards/${article.id}`} className={styles.articleLink}>
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
            ) : (
              <Image
                src={DefaultProduct}
                alt={article.title}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>
        <div className={styles.articleCardBottom}>
          <Image
            src={UserAvatar}
            width={24}
            height={24}
            alt={article.writer.nickname}
          />
          <p className={styles.nickname}>{article.writer.nickname}</p>
          <p className={styles.date}>{formattedUpdatedAt}</p>
          <Image src={LikeCount} width={15} height={15} alt="like" />
          <span className={styles.likeCount}>{article.likeCount}</span>
        </div>
      </Link>
    </li>
  );
};

export default AllArticleCard;
