import { Post } from "@/types/types";
import styles from "./DetailHeader.module.css";
import Profile from "./Profile";

function DetailHeader({ post }: { post: Post }) {
  if (!post) {
    return (
      <div className={styles.detailHeader}>
        <h2 className={styles.headerTitle}>게시글을 찾을 수 없습니다.</h2>
      </div>
    );
  }
  return (
    <div className={styles.detailHeader}>
      <h2 className={styles.headerTitle}>{post.title ?? "제목없음"}</h2>
      <div className={styles.profileBox}>
        <Profile post={post} />
        <span className={styles.profileLike}>♡ {post.likeCount ?? 0}</span>
      </div>
      <p className={styles.detailContent}>{post.content ?? "내용없음"}</p>
    </div>
  );
}

export default DetailHeader;
