import styles from "./Footer.module.css";
import Image from "next/image";
import Facebook from "@/src/assets/logo/logo_facebook.png";
import Youtube from "@/src/assets/logo/logo_youtube.png";
import Twitter from "@/src/assets/logo/logo_twitter.png";
import Instagram from "@/src/assets/logo/logo_instagram.png";

export default function Footer() {
  return (
    <footer>
      <div className={styles["footer-line"]}>
        <div className={styles["footer-info"]}>
          <div className={styles["footer-year"]}>ⓒcodeit - 2024</div>
          <div className={styles["footer-link"]}>
            <a className={styles["footer-link-item"]} href="/privacy">
              Privacy Policy
            </a>
            <a className={styles["footer-link-item"]} href="/faq">
              FAQ
            </a>
          </div>
          <div className={styles["sns-link"]}>
            <a href="https://facebook.com" target="_blank">
              <Image
                className={styles["footer-info-icon"]}
                src={Facebook}
                width="20"
                height="20"
                alt="페이스북"
              />
            </a>
            <a href="https://youtube.com" target="_blank">
              <Image
                className={styles["footer-info-icon"]}
                src={Youtube}
                width="20"
                height="20"
                alt="유튜브"
              />
            </a>
            <a href="https://twitter.com" target="_blank">
              <Image
                className={styles["footer-info-icon"]}
                src={Twitter}
                width="20"
                height="20"
                alt="트위터"
              />
            </a>
            <a href="https://instagram.com" target="_blank">
              <Image
                className={styles["footer-info-icon"]}
                src={Instagram}
                width="20"
                height="20"
                alt="인스타그램"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
