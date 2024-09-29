import Image from "next/image";
import styles from "./PostItem.module.css";
import { forwardRef } from "react";
import { Post } from "@/types/types";

interface PostItemProps {
  post: Post;
}

const PostItem = forwardRef<HTMLDivElement, PostItemProps>(({ post }, ref) => {
  if (!post) return null;
  return (
    <div className={styles.postItem} ref={ref}>
      <div className={styles.itemTop}>
        <p className={styles.itemTopContent}>{post.content}</p>

        <Image
          className={styles.itemImage}
          src={post.image || "/images/img_default.svg"}
          alt={`${post.writer.nickname}의 상품 사진`}
          width={72}
          height={72}
        />
      </div>
      <div className={styles.itemBottom}>
        <div className={styles.itemBottomLeft}>
          <Image
            className={styles.itemImage}
            src="/images/profile.svg"
            alt={`${post.writer.nickname}의 프로필 사진`}
            width={24}
            height={24}
          />
          <span>{post.writer.nickname}</span>
          <span className={styles.itemDate}>
            {post.createdAt instanceof Date
              ? post.createdAt.toLocaleDateString()
              : new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span className={styles.itemBottomRight}>♡ {post.likeCount}</span>
      </div>
    </div>
  );
});

PostItem.displayName = "PostItem";

export default PostItem;
