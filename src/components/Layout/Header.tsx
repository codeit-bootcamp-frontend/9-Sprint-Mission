import { useRouter } from "next/router";
import styles from "./Header.module.scss";
import Logo from "@/assets/images/logo/logo.svg";
import Button from "../UI/Button";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname.startsWith(path);

  return (
    <header className={styles.header}>
      <div className={styles.headerWrap}>
        <h1 className={styles.logoWrap}>
          <Link href="/">
            <Image src={Logo} alt="판다마켓" fill />
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
          <Link href="/login">
            <Button>로그인</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
