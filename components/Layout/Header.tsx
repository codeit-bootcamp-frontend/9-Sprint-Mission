import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import styles from "./Header.module.scss";
import Logo from "@/assets/images/logo/logo.svg";
import Profile from "@/assets/images/icons/ic_profile.svg";
import Button from "../UI/Button/Button";

const Header = () => {
  const { isAuth, Logout } = useAuth();
  const router = useRouter();
  const isActive = (path: string) => router.pathname.startsWith(path);
  const [logoutMenu, setLogoutMenu] = useState(false);

  const handleLogoutToggle = () => {
    setLogoutMenu((prev) => !prev);
  };

  const handleLogout = () => {
    Logout(); // 로그아웃 상태로 업데이트
    setLogoutMenu(false);
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrap}>
        <h1 className={styles.logoWrap}>
          <Link href="/">
            <Image src={Logo} width={153} height={51} alt="판다마켓" />
          </Link>
        </h1>
        <nav className={styles.menuWrap}>
          <ul>
            <li>
              <Link
                href="/boards"
                className={isActive("/boards") ? styles.active : ""}
              >
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className={isActive("/items") ? styles.active : ""}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.userWrap}>
          {!isAuth ? (
            <Link href="/login">
              <Button>로그인</Button>
            </Link>
          ) : (
            <>
              <button onClick={handleLogoutToggle}>
                <Image src={Profile} width={32} height={32} alt="Profile" />
              </button>
              {logoutMenu && <button onClick={handleLogout}>로그아웃</button>}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
