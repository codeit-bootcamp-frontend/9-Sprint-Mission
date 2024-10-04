import { useEffect, useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { Board } from "../types/types";
import axios from "@/src/lib/axios";
import Link from "next/link";
import Image from "next/image";
import styles from "./AllBoardList.module.scss";
import Badge from "@/public/assets/icon/ic_badge_best.png";

export default function BestBoard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [pageSize, setPageSize] = useState<number>(3);
  const orderBy = "like";

  const updatePageSize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setPageSize(1);
    } else if (width < 1200) {
      setPageSize(2);
    } else {
      setPageSize(3);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get<{ list: Board[] }>(
          `/articles?page=1&pageSize=${pageSize}&orderBy=${orderBy}`
        );

        setBoards(response.data.list);
      } catch (error) {
        console.error("Error fetching posts in Best:", error);
      }
    };
    getPosts();
  }, [pageSize]);

  useEffect(() => {
    updatePageSize();

    window.addEventListener("resize", updatePageSize);

    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  return (
    <>
      <div className="best-article">
        <h2 className="page-title">베스트 게시글</h2>
        <ul className={`${styles["article-wrap"]} ${styles["best"]}`}>
          {boards &&
            boards.map((board) => (
              <li className={styles["article-list"]} key={board.id}>
                <span className={styles["badge-best"]}>
                  <Image src={Badge} width={102} height={30} alt="베스트" />
                </span>
                <div>
                  <div className={styles.content}>
                    <Link href={`/boards/${board.id}`}>{board.content}</Link>
                  </div>
                  <div className={styles["profile-img"]}>
                    <Image
                      src={board.image}
                      width={48}
                      height={48}
                      alt="프로필 이미지"
                    />
                  </div>
                </div>
                <div>
                  <div className={styles["user-info"]}>
                    <span className={styles.nickname}>
                      {board.writer.nickname}
                    </span>
                    <span className={styles.like}>
                      <button>{board.likeCount}</button>
                    </span>
                  </div>
                  <div className={styles.date}>
                    {formatDate(board.createdAt)}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
