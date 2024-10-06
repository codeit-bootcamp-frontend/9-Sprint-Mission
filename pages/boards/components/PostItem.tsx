import Image from "next/image";
import styles from "./PostItem.module.css";
import { forwardRef } from "react";
import { Post } from "@/types/types";
import { useRouter } from "next/router";
import Profile from "./Profile";

interface PostItemProps {
  post: Post;
}

const PostItem = forwardRef<HTMLDivElement, PostItemProps>(({ post }, ref) => {
  const router = useRouter();

  if (!post) return null;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/images/img_default.svg";
  };

  return (
    <div
      onClick={() => {
        router.push(`/boards/${post.id}`);
      }}
      className={styles.postItem}
      ref={ref}
    >
      <div className={styles.itemTop}>
        <p className={styles.itemTopContent}>{post.title}</p>
        <Image
          className={styles.itemImage}
          src={post.image || "/images/img_default.svg"}
          alt={`${post.writer.nickname}의 상품 사진`}
          width={72}
          height={72}
          onError={handleImageError}
        />
      </div>
      <div className={styles.itemBottom}>
        <Profile post={post} />
        <span className={styles.itemBottomRight}>♡ {post.likeCount}</span>
      </div>
    </div>
  );
});

PostItem.displayName = "PostItem";

export default PostItem;
