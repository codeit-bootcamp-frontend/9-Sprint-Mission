import Image from "next/image";
import styles from "@/styles/NotFound.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={styles["not-found-page-container"]}>
      <Image
        src="/img_reply_empty.png"
        width={140}
        height={140}
        alt=""
        className={styles["not-found-img"]}
      />
      <div className={styles["not-found-content"]}>
        찾을 수 없는 페이지 입니다.
      </div>
      <div className={styles["link-container"]}>
        <Link
          href="/boards"
          className={styles["prev-btn"]}
        >
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
