import { Post } from "@/types/types";
import styles from "./Profile.module.css";
import Image from "next/image";

interface ProfileProps {
  post?: Post;
}

function Profile({ post }: ProfileProps) {
  const nickname = post?.writer?.nickname || "익명";
  const createdAt = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "날짜 없음";

  return (
    <div className={styles.profile}>
      <Image
        className={styles.profileImage}
        src="/images/profile.svg"
        alt={`${nickname}의 프로필 사진`}
        width={24}
        height={24}
      />
      <span>{nickname}</span>
      <span className={styles.profileDate}>{createdAt}</span>
    </div>
  );
}

export default Profile;
