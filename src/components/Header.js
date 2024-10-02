import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["header-wrap"]}>
        <h1 className={styles["logo"]}>
          <Link href="/">판다마켓</Link>
        </h1>
        <ul>
          <li>
            <Link href="/boards">자유게시판</Link>
          </li>
          <li>
            <Link href="/boards">중고마켓</Link>
          </li>
        </ul>
        <div className={styles["user-img"]}>
          <Image
            src="/assets/icon/user-icon.png"
            width={40}
            height={40}
            alt="프로필"
          />
        </div>
      </div>
    </header>
  );
}
