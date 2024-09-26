import { useRouter } from "next/router";
import { fetchPosts } from "@/lib/axios";
import { useEffect, useState } from "react";
import MainBoard from "@/components/MainBoards";
import BestBoard from "@/components/BestBoards";
import styles from "@/pages/boards/boards.module.scss";
import SearchAndSort from "@/components/SearchAndSort";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
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

    if (q) {
      getPosts();
    }
  }, [q]);

  // 검색어에 맞는 게시글 필터링
  const filteredBoards = boards.filter((article) =>
    article.content.toLowerCase().includes(q?.toLowerCase())
  );

  return (
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
        <MainBoard sortedBoards={filteredBoards} />
      </div>
    </section>
  );
}
