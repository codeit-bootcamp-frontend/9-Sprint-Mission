import styles from "@/styles/BestPosts.module.css";
import BestPostItem from "./BestPostItem";

function BestPosts({ posts }) {
  return (
    <div className={styles.bestPosts}>
      <h2 className={styles.postTitle}>베스트 게시글</h2>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <BestPostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestPosts;
