import Image from "next/image";
import UserNickname from "./UserNickname";
import CreatedDate from "./CreatedDate";
import styles from "@/components/CommentItem.module.css";

export default function CommentItem() {
  return (
    <>
      <div className={styles["comment-title-container"]}>
        <div className={styles["comment-title"]}>혹시 사용기간이 어떻게 되실까요</div>
        <Image src="/ic_kebab.png" width={24} height={24} alt="" />
      </div>
      <div>
        <Image src="/ic_profile.png" width={32} height={32} alt=""/>
        <div className={styles["info-container"]}>
          <UserNickname className={styles["user-nickname"]}>닉네임</UserNickname>
          <CreatedDate className={styles["created-at"]}>날짜</CreatedDate>
        </div>
      </div>
    </>
  );
}
