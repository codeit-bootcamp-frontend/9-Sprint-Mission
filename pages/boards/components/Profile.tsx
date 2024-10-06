import { Post } from "@/types/types";
import styles from "./Profile.module.css";
import Image from "next/image";

interface ProfileProps {
  post: Post;
}

function Profile({ post }: ProfileProps) {
  return (
    <div className={styles.profile}>
      <Image
        className={styles.profileitemImage}
        src="/images/profile.svg"
        alt={`${post.writer.nickname}의 프로필 사진`}
        width={24}
        height={24}
      />
      <span>{post.writer.nickname}</span>
      <span className={styles.profileDate}>
        {post.createdAt instanceof Date
          ? post.createdAt.toLocaleDateString()
          : new Date(post.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}

export default Profile;
