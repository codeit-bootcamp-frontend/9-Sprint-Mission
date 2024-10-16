import Link from "next/link";
import styles from "./Footer.module.css";
import classNames from "classnames/bind";
import Image from "next/image";

export function Footer() {
  const cx = classNames.bind(styles);
  return (
    <div className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.company}>©codeit - 2024</div>
        <div className={styles["policy-faq-wrap"]}>
          <span className={styles.policy}>Private Policy</span>
          <span className={styles.faq}>FAQ</span>
        </div>
        <div className={styles.links}>
          <Link className={cx(styles.link)} href="https://facebook.com">
            <Image
              src={"icons/ic_facebook.svg"}
              width={18}
              height={18}
              alt="페이스북"
            />
          </Link>
          <Link className={cx(styles.link)} href="https://twitter.com">
            <Image
              src={"icons/ic_twitter.svg"}
              width={18}
              height={18}
              alt="트위터"
            />
          </Link>
          <Link className={cx(styles.link)} href="https://youtube.com">
            <Image
              src={"icons/ic_youtube.svg"}
              width={18}
              height={18}
              alt="유튜브"
            />
          </Link>
          <Link className={cx(styles.link)} href="https://instagram.com">
            <Image
              src={"icons/ic_instagram.svg"}
              width={18}
              height={18}
              alt="인스타그램"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
