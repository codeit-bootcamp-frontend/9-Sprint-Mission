import CreatedDate from "@/components/CreatedDate";
import LikeCountBox from "@/components/LikeCountBox";
import UserNickname from "@/components/UserNickname";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "@/styles/board.module.css";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Articles } from "@/types/types";
import timeDiff from "@/utils/timeDiff";
import Button from "@/components/Button";

export default function Board() {
  const router = useRouter();
  const id = router.query["id"];

  const [board, setBoard] = useState<Articles>();

  async function getBoard(targetId: number) {
    const res = await axios.get(`/articles/${targetId}`);
    const board = res.data;
    setBoard(board);
  }

  useEffect(() => {
    if (id) {
      getBoard(+id);
    }
  }, [id]);

  console.log(board);

  return (
    <>
      <section className={styles["board-container"]}>
        {board && (
          <>
            <div className={styles["title-container"]}>
              <div className={styles.title}>{board.title}</div>
              <div className={styles["kebab-container"]}>
                <Image
                  src="/ic_kebab.png"
                  width={24}
                  height={24}
                  alt=""
                ></Image>
              </div>
            </div>
            <div className={styles["info-container"]}>
              <div className={styles["user-info-container"]}>
                <Image
                  src={board.image}
                  alt=""
                  width={32}
                  height={33}
                  className={styles.img}
                />
                <UserNickname className={styles["user-nickname"]}>
                  {board.writer.nickname}
                </UserNickname>
                <CreatedDate className={styles["created-at"]}>
                  {timeDiff(board.createdAt)}
                </CreatedDate>
              </div>
              <LikeCountBox></LikeCountBox>
            </div>
            <div className={styles.content}>{board.content}</div>
          </>
        )}
        <div className={styles["comment-container"]}>
          <label htmlFor="comment">댓글달기</label>
          <textarea id="comment" placeholder="댓글을 입력해주세요."></textarea>
        </div>

        <div className={styles["btn-container"]}>
          <Button color="gray">등록</Button>
        </div>
      </section>
      <section></section>
    </>
  );
}
