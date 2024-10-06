import { Post } from "@/types/types";
import styles from "./DetailHeader.module.css";
import Profile from "./Profile";

function DetailHeader({ post }: { post: Post }) {
  return (
    <div className={styles.detailHeader}>
      <h2>{post.title}</h2>
      <div className={styles.profileBox}>
        <Profile post={post} />
        <span className={styles.profileLike}>♡ {post.likeCount}</span>
      </div>
      <p className={styles.detailContent}>{post.content}</p>
    </div>
  );
}

export default DetailHeader;
