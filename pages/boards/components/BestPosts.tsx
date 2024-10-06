import styles from "./BestPosts.module.css";
import BestPostItem from "./BestPostItem";
import useGetDataNum from "@/hooks/useGetDataNum";
import { Post } from "@/types/types";

interface BestPostsProps {
  bestPosts: Post[] | null | undefined;
}

function BestPosts({ bestPosts }: BestPostsProps) {
  const dataNum = useGetDataNum();

  // dataNum이 0 이하일 경우 빈 배열을 반환
  const filteredBestPosts =
    dataNum > 0 && bestPosts ? bestPosts.slice(0, dataNum) : [];

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
        <p className={styles.noPosts}>게시글이 없습니다.</p>
      )}
    </div>
  );
}

export default BestPosts;
