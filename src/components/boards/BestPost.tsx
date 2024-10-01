import { useEffect, useState } from "react";
import BestPostItem from "./BestPostItem";
import axios from "@/src/lib/axios";
import { Post, BestPosts } from "@/src/types";
import styles from "./BestPost.module.css";

export default function BestPost({ bestPosts }: BestPosts) {
  const [posts, setPosts] = useState(bestPosts);
  const [pageSize, setPageSize] = useState<number>(3);

  function getPageSize() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1200) return 2;
    return 3;
  }

  useEffect(() => {
    const initialPageSize = getPageSize();
    setPageSize(initialPageSize);

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `/articles?page=1&pageSize=${pageSize}&orderBy=like`
        );
        setPosts(response.data.list);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [pageSize]);

  useEffect(() => {
    const handleResize = () => {
      const newPageSize = getPageSize();
      setPageSize(newPageSize);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.postContainer}>
      <strong className={styles.postTitle}>베스트 게시물</strong>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItme}>
            <BestPostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
