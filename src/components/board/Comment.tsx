import styles from "./Comment.module.css";
import Kebab from "@/src/components/UI/Kebab";
import profile from "@/src/assets/profile.png";
import Image from "next/image";
import { Comment } from "@/src/types";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className={styles.commentContainer}>
      <strong className={styles.commentContent}>{comment.content}</strong>

      <div className={styles.commentInfo}>
        <Image src={profile} alt="유저이미지" width={40} height={40} priority />
        <ul className={styles.commentDescription}>
          <li className={styles.userNickname}>{comment.writer.nickname}</li>
          <li className={styles.createdAt}>{comment.createdAt}</li>
        </ul>
      </div>

      <Kebab />
    </div>
  );
}
