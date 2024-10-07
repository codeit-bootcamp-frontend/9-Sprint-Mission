import styles from "./Comments.module.css";
import CommentItem from "@/src/components/board/Comment";
import { Comment } from "@/src/types";

export default function Comments({ comments }: { comments: Comment[] }) {
  return (
    <div>
      <ul className={styles.commentsList}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>
    </div>
  );
}
