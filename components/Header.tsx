import styles from "@/components/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import profile from "@/public/assets/profile.svg";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.navigatorContainer}>
        <h1>
          <Link href="/">
            <div className={styles.logoContainer}></div>
          </Link>
        </h1>
        <Link className={styles.navigatorLink} href="/boards">
          자유게시판
        </Link>
        <Link className={styles.navigatorLink} href="/usedMarket">
          중고마켓
        </Link>
      </div>
      <div className={styles.profileContainer}>
        <Image fill src={profile} alt="나의 프로필" />
      </div>
    </header>
  );
}
