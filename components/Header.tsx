import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const currentPath = router.pathname;
  const isBoardsPage = currentPath.startsWith("/boards");

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          {/* 홈으로 이동하는 링크 */}
          <Link href="/">
            <Image
              src="/logo-big.png"
              width={153}
              height={51}
              alt="판다마켓"
            ></Image>
          </Link>
          <div className={styles.category}>
            <Link
              href="/boards"
              className={`${styles["category-item"]} ${isBoardsPage ? styles["active"] : ""}`}
            >
              자유게시판
            </Link>
            <Link href="/" className={styles["category-item"]}>
              중고마켓
            </Link>
          </div>
        </div>
        <Image src="/user.png" width={40} height={40} alt="프로필"></Image>
      </nav>
    </header>
  );
}
