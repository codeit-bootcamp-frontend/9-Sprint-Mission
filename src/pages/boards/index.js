import { fetchPosts } from "@/src/lib/axios";
import { useState, useEffect } from "react";
import styles from "./boards.module.scss";
import BestBoard from "@/src/components/BestBoards";
import SearchAndSort from "@/src/components/SearchAndSort";
import MainBoard from "@/src/components/MainBoards";

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setBoards(data.list);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  const sortedBoards = [...boards].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOrder === "likesCount") {
      return b.likeCount - a.likeCount;
    }
    return 0;
  });

  return (
    <>
      <section className="container">
        <BestBoard />
        <div className={styles.article}>
          <h2 className="page-title">
            게시글
            <button className="btn-box" type="button">
              글쓰기
            </button>
          </h2>
          <SearchAndSort setSortOrder={setSortOrder} />
          <MainBoard sortedBoards={sortedBoards} />
        </div>
      </section>
    </>
  );
}
