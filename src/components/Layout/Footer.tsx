import FacebookLogo from "../../assets/images/social/facebook-logo.svg";
import TwitterLogo from "../../assets/images/social/twitter-logo.svg";
import YoutubeLogo from "../../assets/images/social/youtube-logo.svg";
import InstagramLogo from "../../assets/images/social/instagram-logo.svg";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";

const Footer = () => (
  <section className={styles.footerContainer}>
    <div className={styles.footerWrap}>
      <p className={styles.copyright}>©codeit - 2024</p>

      <div className={styles.footerMenu}>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/faq">FAQ</Link>
      </div>

      <div className={styles.socialMedia}>
        <Link
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="판다마켓 페이스북"
        >
          <Image src={FacebookLogo} alt="페이스북" width={20} height={20} />
        </Link>
        <Link
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="판다마켓 트위터"
        >
          <Image src={TwitterLogo} alt="트위터" width={20} height={20} />
        </Link>
        <Link
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="판다마켓 유튜브"
        >
          <Image src={YoutubeLogo} alt="유튜브" width={20} height={20} />
        </Link>
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="판다마켓 인스타그램"
        >
          <Image src={InstagramLogo} alt="인스타그램" width={20} height={20} />
        </Link>
      </div>
    </div>
  </section>
);

export default Footer;
