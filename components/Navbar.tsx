import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarContent}>
          <Logo />
          <div className={styles.navlinkContainer}>
            <Link
              href="/boards"
              className={`${styles.navlink} ${
                router.pathname === "/boards" ? styles.active : ""
              }`}
            >
              자유게시판
            </Link>
            <Link
              href="/items"
              className={`${styles.navlink} ${
                router.pathname === "/items" ? styles.active : ""
              }`}
            >
              중고마켓
            </Link>
          </div>
        </div>
        {/* <Button
          onClick={() => {
            router.push("/login");
          }}
        >
          로그인
        </Button> */}
        <Link href="/">
          <Image
            src="/images/profile.svg"
            alt="프로필"
            width={40}
            height={40}
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
