import { Reply } from "@/types/types";
import styles from "./ArticleReplyItem.module.css";
import Kebab from "./Kebab";
import Image from "next/image";

export interface Props {
  key: number;
  reply: Reply;
}

export default function ArticleReplyItem({ key, reply }: Props) {
  const { content, updatedAt } = reply;
  const { nickname, image } = reply.writer;

  return (
    <div key={key} className={styles["reply-item"]}>
      <div className={styles.wrap}>
        <div className={styles.content}>{content}</div>
        <div className={styles["img-name-date"]}>
          <div className={styles.image}>
            {image ? (
              <Image src={image} alt="프로필" width={32} height={32}>
                {image}
              </Image>
            ) : (
              <Image src="/user.png" alt="대체이미지" width={32} height={32} />
            )}
          </div>
          <div className={styles["name-date"]}>
            <div className={styles.nickname}>{nickname}</div>
            <div className={styles.updatedAt}>{updatedAt}</div>
          </div>
        </div>
      </div>
      <Kebab />
    </div>
  );
}
