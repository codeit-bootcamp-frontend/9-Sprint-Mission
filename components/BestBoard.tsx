import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import styles from "@/components/BestBoard.module.css";
import BestBoardItem from "./BestBoardItem";

interface Writer {
  id: number; // 작성자 ID
  nickname: string; // 작성자 닉네임
}

export interface Board {
  id: number; // 게시글 ID
  title: string; // 게시글 제목
  content: string; // 게시글 내용
  image: string; // 게시글 이미지 URL
  likeCount: number; // 좋아요 수
  createdAt: string; // 게시글 생성 날짜
  updatedAt: string; // 게시글 수정 날짜
  writer: Writer; // 작성자 정보
}

export default function BestBoard() {
  const [bestBoards, setBestBoards] = useState<Board[]>([]);
  const [pageSize, setPageSize] = useState<number>(3);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setPageSize(1); // 모바일
    } else if (width < 1200) {
      setPageSize(2); // 태블릿
    } else {
      setPageSize(3); // PC
    }
  };

  const getBestBoard = async () => {
    try {
      const res = await axios.get(
        `/articles?page=1&pageSize=${pageSize}&orderBy=like`
      );
      const boards = res.data.list ?? [];
      setBestBoards(boards);
    } catch (error) {
      console.log("error= " + error);
    }
  };

  useEffect(() => {
    handleResize(); // 초기 화면 크기 체크
    getBestBoard();
    window.addEventListener("resize", handleResize); // 리사이즈 이벤트 리스너 등록

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getBestBoard();
  }, [pageSize]);

  return (
    <section>
      <h2 className={styles.bestBoardText}>베스트 게시글</h2>
      {bestBoards.length > 0 ? (
        <ul className={styles.bestBoardItemList}>
          {bestBoards.map((bestBoard) => (
            <BestBoardItem key={bestBoard.id} bestBoard={bestBoard} />
          ))}
        </ul>
      ) : (
        <p>베스트 게시글을 불러오는 중...</p>
      )}
    </section>
  );
}
