import styles from "./BestPosts.module.css";
import BestPostItem from "./BestPostItem";
import useDataNum from "@/hooks/useDataNum";
import { Post } from "@/types/types";

interface BestPostsProps {
  bestPosts: Post[];
}

function BestPosts({ bestPosts }: BestPostsProps) {
  const dataNum = useDataNum();
  const filtedBestPosts = bestPosts.slice(0, dataNum);

  return (
    <div className={styles.bestPosts}>
      <h2 className={styles.postTitle}>베스트 게시글</h2>
      <ul className={styles.postList}>
        {filtedBestPosts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <BestPostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestPosts;
