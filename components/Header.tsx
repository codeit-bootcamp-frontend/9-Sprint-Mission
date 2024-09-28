import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      
      <div className={styles.gnb}>
        <h1>
          <Image src="/panda.png" width={153} height={51} alt="판다마켓" />
        </h1>
        <li className={styles["gnb-menu-container"]}>
          <ul className={styles["gnb-menu"]}>자유게시판</ul>
          <ul className={styles["gnb-menu"]}>중고마켓</ul>
        </li>
      </div>
      <Image
        src="/Frame 2609463.png"
        width={40}
        height={40}
        alt="사용자이미지"
      />
     
    </div>
  );
}
