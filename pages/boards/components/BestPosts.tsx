import styles from "./BestPosts.module.css";
import BestPostItem from "./BestPostItem";
import useDataNum from "@/hooks/useDataNum";
import { Post } from "@/types/types";

interface BestPostsProps {
  bestPosts: Post[];
}

function BestPosts({ bestPosts }: BestPostsProps) {
  const dataNum = useDataNum();

  // dataNum이 0 이하일 경우 빈 배열을 반환
  const filteredBestPosts = dataNum > 0 ? bestPosts.slice(0, dataNum) : [];

  return (
    <div className={styles.bestPosts}>
      <h2 className={styles.postTitle}>베스트 게시글</h2>
      {filteredBestPosts.length > 0 ? (
        <ul className={styles.postList}>
          {filteredBestPosts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <BestPostItem post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noPosts}>게시글이 없습니다.</p> // 게시글이 없을 때 표시할 메시지
      )}
    </div>
  );
}

export default BestPosts;
