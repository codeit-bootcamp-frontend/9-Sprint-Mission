import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/logo.png";
import profile from "@/src/assets/profile.png";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className={styles.headerContainer}>
      <h1>
        <Link className={styles.headerLogoLink} href="/">
          <Image
            className={styles.headerLogo}
            src={logo}
            alt="판다마켓"
            width={153}
            height={51}
          />
        </Link>
      </h1>
      <div className={styles.headerItems}>
        <Link className={styles.headerItem} href="/boards">
          자유게시판
        </Link>
        <Link className={styles.headerItem} href="/items">
          중고마켓
        </Link>
      </div>
      {isLoggedIn ? (
        <button className={styles.headerProfile} type="button">
          <Image
            className={styles.headerProfileImg}
            src={profile}
            alt="프로필"
            width={40}
            height={40}
          />
        </button>
      ) : (
        <div className={styles.headerSign}>
          <Link className={styles.headerSignItem} href="/login">
            로그인
          </Link>
          <Link className={styles.headerSignItem} href="/register">
            회원가입
          </Link>
        </div>
      )}
    </header>
  );
}
