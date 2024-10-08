import Image from "next/image";
import styles from "./NoReply.module.css";

export default function NoReply() {
  return (
    <div className={styles.wrap}>
      <Image src={`/Img_reply_empty.png`} alt="" width={140} height={140} />
      <div className={styles.comment}>
        아직 댓글이 없어요,
        <br />
        지금 댓글을 달아보세요!
      </div>
    </div>
  );
}
