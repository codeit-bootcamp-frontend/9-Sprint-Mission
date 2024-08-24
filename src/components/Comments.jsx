import { useState, useEffect } from "react";
import { getProductComents } from "../api/api";
import styles from "./Comments.module.css";
import kebabButton from "../assets/kebabButton.png";

const limit = 5;

function CommentItem({ comment }) {
  return (
    <div className={styles["comment-container"]}>
      <p className={styles["comment"]}>{comment.content}</p>
      <div className={styles["comment-user-container"]}>
        <img src={comment.writer.image} alt="문의유저" width={32} height={32} />
        <div className={styles["comment-user-wrap"]}>
          <strong className={styles["comment-writer"]}>
            {comment.writer.nickname}
          </strong>
          <em className={styles["comment-create"]}>{comment.createdAt}</em>
          {/* 케밥버튼 만들어야 함 */}
          <button className={styles["comment-kebab-button"]} type="button">
            <img src={kebabButton} alt="케밥버튼" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Comments({ itemId }) {
  const [comments, setComments] = useState([]);

  const handleLoad = async (option) => {
    const { list } = await getProductComents(option);
    setComments(list);
    console.log(list);
  };

  useEffect(() => {
    handleLoad({ itemId, limit });
  }, [itemId]);

  //코멘트 데이터가 제대로 작동을 안하고 있음. 제품 아이디까지는 맞는듯?

  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <CommentItem comment={comment} />
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
