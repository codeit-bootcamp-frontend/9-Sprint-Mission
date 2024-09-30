import Image from "next/image";
import { Post } from "@/src/types";
import styles from "./AllPostItem.module.css";
import heart from "@/src/assets/ic_heart.png";
import formData from "@/src/lib/formData";
import profile from "@/src/assets/profile.png";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemContent}>
        <strong className={styles.itemTitle}>{post.title}</strong>
        {post.image && (
          <Image src={post.image} alt={post.title} width={72} height={72} />
        )}
      </div>
      <ul className={styles.itemDescription}>
        <Image src={profile} alt="작성자" width={24} height={24} />
        <li className={styles.writerNickname}>{post.writer.nickname}</li>
        <li className={styles.createdAt}>{formData(post.createdAt)}</li>
        <li className={styles.likeContainer}>
          <Image src={heart} alt="좋아요" width={16} height={16} />
          {post.likeCount}
        </li>
      </ul>
    </div>
  );
}
