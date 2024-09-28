import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { throttle } from "@/lib/throttle";

export default function Header() {
  const router = useRouter();
  const currentPath = router.pathname;
  const isBoardsPage = currentPath.startsWith("/boards");

  const initialWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
  const [width, setWidth] = useState<number>(initialWidth);
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };
    const throttledResize = throttle(handleResize, 500);
    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, []);

  const logoSrc = width >= 768 ? "/logo-big.png" : "/logo-mobile.png";
  const logoSize = width >= 768 ? [153, 51] : [81, 40]; // [width, height]

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          {/* 홈으로 이동하는 링크 */}
          <Link href="/">
            <Image
              src={logoSrc}
              width={logoSize[0]}
              height={logoSize[1]}
              alt="판다마켓"
            />
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
