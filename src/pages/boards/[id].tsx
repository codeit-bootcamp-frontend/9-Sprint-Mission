import { GetServerSideProps } from "next";
import { Board, Comment } from "@/src/types/types";
import { formatDate } from "@/src/utils/dateUtils";
import Link from "next/link";
import Image from "next/image";
import userIcon from "@/public/assets/icon/user-icon.png";
import kebabIcon from "@/public/assets/icon/ic_kebab.png";
import axios from "@/src/lib/axios";
import styles from "./Boards.module.scss";

interface BoardDetailProps {
  boardData: Board | null;
  comments: Comment[];
  error: string | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let boardData: Board | null = null;
  let comments: Comment[] = []; // 댓글 데이터 초기화
  let error: string | null = null;

  try {
    const boardRes = await axios.get<Board>(`/articles/${id}`);
    boardData = boardRes.data;

    const commentsRes = await axios.get<{ list: Comment[] }>(
      `/articles/${id}/comments?limit=10`
    );
    comments = commentsRes.data.list;
  } catch (error) {
    error = "데이터를 가져오는 데 문제가 발생했습니다."; // 에러 처리
  }

  return {
    props: {
      boardData,
      comments,
      error,
    },
  };
};

export default function BoardDetailPage({
  boardData,
  comments,
  error,
}: BoardDetailProps) {
  if (!boardData) return <div>데이터가 없습니다.</div>;
  return (
    <div className="container">
      <div className={styles.question}>
        <div className={styles["question-title"]}>
          <p>{boardData.title}</p>
          <button type="button" className={styles["question-title"]}>
            <Image src={kebabIcon} width={24} height={24} alt="케밥 아이콘" />
          </button>
        </div>
        <div className={styles["question-writer"]}>
          <div className={styles["writer-info"]}>
            <span className={styles["user-img"]}>
              <img src={boardData.image} alt="작성자 이미지" />
            </span>
            <span className={styles.nickname}>
              {boardData?.writer.nickname}
            </span>
            <span className={styles.date}>
              {formatDate(boardData.createdAt)}
            </span>
          </div>
          <div className={styles.like}>
            <button>{boardData.likeCount}</button>
          </div>
        </div>
        <p className={styles["question-content"]}>{boardData.content}</p>
      </div>
      <div className={styles["comment-wrap"]}>
        <form>
          <p className={styles["comment-tit"]}>댓글달기</p>
          <textarea className="form-input" placeholder="댓글을 입력해주세요." />
          <button className="btn-box gray" type="submit">
            등록
          </button>
        </form>
      </div>
      {comments.length === 0 ? (
        <div className={styles["no-comments"]}>
          아직 댓글이 없어요,
          <br />
          지금 댓글을 달아보세요!
        </div>
      ) : (
        <ul className={styles["article-wrap"]}>
          {comments.map((comment) => (
            <li className={styles["article-list"]} key={comment.id}>
              <div>
                <div className={styles.content}>{comment.content}</div>
                <button type="button" className={styles["question-title"]}>
                  <Image
                    src={kebabIcon}
                    width={24}
                    height={24}
                    alt="케밥 아이콘"
                  />
                </button>
              </div>
              <div>
                <div className={styles["user-info"]}>
                  <span className={styles["user-img"]}>
                    <Image
                      src={userIcon}
                      width={24}
                      height={24}
                      alt="사용자 이미지"
                    />
                  </span>
                  <span className={styles.nickname}>
                    {comment.writer.nickname}
                  </span>
                  <span className={styles.date}>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <span className="btn-back">
        <Link href="/boards">목록으로 돌아가기</Link>
      </span>
    </div>
  );
}
