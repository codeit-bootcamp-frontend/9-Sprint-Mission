import Image from "next/image";
import styles from "./BestPostItem.module.css";
import BestBadge from "./BestBadge";
import { Post } from "@/types/types";

interface BestPostItemProps {
  post: Post | null; // null 처리
}

function BestPostItem({ post }: BestPostItemProps) {
  if (!post) return null; // post가 없을 경우 null 반환

  return (
    <div className={styles.bestPostItem}>
      <BestBadge />
      <div className={styles.bestPostMain}>
        <h2 className={styles.mainTitle}>{post.title}</h2>
        {post.image ? (
          <Image
            src={post.image}
            alt={`${post.writer.nickname}의 상품 사진`} // alt 속성 개선
            width={72}
            height={72}
          />
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
          {new Date(post.createdAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          {/* 한국어 날짜 형식 */}
        </span>
      </div>
    </div>
  );
}

export default BestPostItem;
