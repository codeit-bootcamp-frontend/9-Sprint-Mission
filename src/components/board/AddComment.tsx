import styles from "./AddComment.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddComments() {
  const [comment, setComment] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
    // const res = await axios.post(`/articles/${id}/comments`);
  };

  return (
    <div className={styles.addCommentContainer}>
      <form className={styles.addCommentForm} onSubmit={handleSubmit}>
        <label className={styles.addCommentLabel} htmlFor="addComment">
          댓글 달기
        </label>
        <textarea
          className={styles.addCommentInput}
          id="addComment"
          name=""
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={handleChange}
        />
        <div className={styles.buttonContainer}>
          <button
            className={styles.addCommentButton}
            disabled={!comment.trim()}
            type="submit"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
