import { useState } from "react";
import { Board } from "@/src/types/types";
import axios from "@/src/lib/axios";
import styles from "./boards.module.scss";
import BestBoard from "@/src/components/BestBoards";
import SearchAndSort from "@/src/components/SearchAndSort";
import MainBoard from "@/src/components/MainBoards";

//Boards 컴포넌트의 props 를 정의하기 위해 BoardsProps 인터페이스를 추가
interface BoardsProps {
  boards: Board[];
}

export async function getStaticProps() {
  // boards 변수를 초기화하여 항상 정의된 상태를 유지
  let boards: Board[] = [];

  try {
    const res = await axios.get("/articles?page=1&pageSize=10&orderBy=recent");
    boards = res.data.list || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return {
    props: {
      boards,
    },
  };
}

export default function Boards({ boards }: BoardsProps) {
  const [sortOrder, setSortOrder] = useState<"latest" | "likesCount">("latest");

  const sortedBoards = [...boards].toSorted((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOrder === "likesCount") {
      return parseInt(b.likeCount) - parseInt(a.likeCount);
    }
    return 0;
  });
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
        {sortedBoards.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          <MainBoard sortedBoards={sortedBoards} />
        )}
      </div>
    </section>
  );
}
