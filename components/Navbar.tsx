import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import styles from "@/styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarContent}>
          <Logo />
          <div className={styles.navlinkContainer}>
            <Link href="/" className={styles.navlink}>
              자유게시판
            </Link>
            <Link href="/" className={styles.navlink}>
              중고마켓
            </Link>
          </div>
        </div>
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
