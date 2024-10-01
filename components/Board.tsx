import { useEffect, useState, useRef, useCallback } from "react";
import axios from "@/lib/axios";
import BoardItem from "./BoardItem";
import styles from "@/components/Board.module.css";
import SortDropDown from "./SortDropDown";
import { useSort } from "@/context/SortContext";
import SearchForm from "./SearchForm";

interface Writer {
  id: number;
  nickname: string;
}

export interface BoardList {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export default function Board() {
  const [boards, setBoards] = useState<BoardList[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { sortBy } = useSort();
  const [page, setPage] = useState<number>(1); // 페이지 번호 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 불러올 데이터 여부
  const observer = useRef<IntersectionObserver | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setBoards([]); // 검색 시 기존 데이터를 초기화
    setPage(1); // 페이지 번호도 초기화
  };

  const getBoards = async () => {
    if (isLoading || !hasMore) return; // 로딩 중이거나 더 불러올 데이터가 없으면 중지
    setIsLoading(true);
    try {
      const queryParam = searchQuery ? `&keyword=${searchQuery}` : "";
      const res = await axios.get(
        `/articles?page=${page}&pageSize=10&orderBy=${sortBy}${queryParam}`
      );
      const newBoards = res.data.list ?? [];
      if (page === 1) {
        setBoards(newBoards); // 페이지 1일 때 기존 데이터 초기화
      } else {
        setBoards((prevBoards) => [...prevBoards, ...newBoards]); // 이전 데이터에 새로운 데이터 추가
      }
      setHasMore(newBoards.length > 0); // 더 가져올 데이터가 없으면 false
    } catch (error) {
      console.log("error= " + error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 번호가 변경될 때 데이터를 로드
  useEffect(() => {
    getBoards();
  }, [page, sortBy, searchQuery]);

  // IntersectionObserver 콜백 함수
  const lastBoardElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect(); // 기존 observer 해제

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
        }
      });

      if (node) observer.current.observe(node); // 새로운 요소 관찰
    },
    [isLoading, hasMore]
  );

  // 정렬 조건 또는 검색어 변경 시 데이터를 초기화하고 1페이지부터 로드
  useEffect(() => {
    setBoards([]); // 기존 데이터 초기화
    setPage(1); // 페이지 번호를 1로 리셋
    setHasMore(true); // 데이터를 다시 불러올 수 있도록 설정
    getBoards(); // 첫 페이지 데이터 로드
  }, [sortBy, searchQuery]);

  return (
    <section>
      <div className={styles.boardTextSubmitWrap}>
        <h2 className={styles.boardText}>게시글</h2>
        <button className={styles.submitButton}>글쓰기</button>
      </div>
      <div className={styles.inputDropBoxWrap}>
        <SearchForm onSearch={handleSearch} />
        <SortDropDown />
      </div>
      <ul>
        {boards.map((board, index) => {
          if (boards.length === index + 1) {
            return (
              <li ref={lastBoardElementRef} key={board.id}>
                <BoardItem board={board} />
              </li>
            ); // 마지막 요소에 ref 설정
          } else {
            return (
              <li key={board.id}>
                <BoardItem board={board} />
              </li>
            );
          }
        })}
      </ul>
      {isLoading && <p>게시글을 불러오는 중...</p>}
    </section>
  );
}
