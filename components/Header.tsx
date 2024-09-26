import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          {/* 홈으로 이동하는 링크 */}
          <Image
            src="/logo-big.png"
            width={153}
            height={51}
            alt="판다마켓"
          ></Image>
          <div className={styles.category}>
            <Link href="" className={styles["category-item"]}>
              자유게시판
            </Link>
            <Link href="" className={styles["category-item"]}>
              중고마켓
            </Link>
          </div>
        </div>
        <Image src="/user.png" width={40} height={40} alt="프로필"></Image>
      </nav>
    </header>
  );
}
