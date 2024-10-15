import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // 토큰 삭제
    setIsLoggedIn(false); // 상태 업데이트
    setShowLogout(false); // 로그아웃 버튼 숨김
  };

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
        <div className={styles.login}>
          {isLoggedIn ? (
            <>
              <div className={styles["user-img"]}>
                <Image
                  src="/assets/icon/user-icon.png"
                  width={40}
                  height={40}
                  alt="프로필"
                  onClick={() => setShowLogout((prev) => !prev)} // 클릭 시 로그아웃 버튼 토글
                />
              </div>
              {showLogout && (
                <button onClick={handleLogout} className={styles.logoutButton}>
                  로그아웃
                </button>
              )}
            </>
          ) : (
            <button type="button" className="btn-box">
              <Link href="/login">로그인</Link>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
