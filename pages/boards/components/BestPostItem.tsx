import Image from "next/image";
import styles from "./BestPostItem.module.css";
import BestBadge from "./BestBadge";
import { Post } from "@/types/types";

interface BestPostItemProps {
  post: Post;
}

function BestPostItem({ post }: BestPostItemProps) {
  return (
    <div className={styles.bestPostItem}>
      <BestBadge />
      <div className={styles.bestPostMain}>
        <h2 className={styles.mainTitle}>{post.title}</h2>
        {post.image ? ( // 이미지가 있을 경우만 표시
          <Image src={post.image} alt="상품사진" width={72} height={72} />
        ) : (
          <Image
            src="/images/img_default.svg" // 기본 이미지
            alt="기본 상품사진"
            width={72}
            height={72}
          />
        )}
      </div>
      <div className={styles.bestPostSub}>
        <div className={styles.bestPostLeft}>
          <span>{post.writer.nickname}</span>
          <span>♡ {post.likeCount}</span>
        </div>
        <span className={styles.bestPostDate}>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default BestPostItem;
