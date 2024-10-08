import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/logo.png";
import profile from "@/src/assets/profile.png";
import styles from "./Header.module.css";

// function getLinkStyle({ isActive }, path) {
//   return {
//     color:
//       isActive || window.location.pathname === path ? "#3692ff" : undefined,
//   };
// }

export default function Header() {
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
      <button className={styles.headerProfile} type="button">
        <Image
          className={styles.headerProfileImg}
          src={profile}
          alt="프로필"
          width={40}
          height={40}
        />
      </button>
    </header>
  );
}
