import Container from "../Container";
import styles from "./HomeFooter.module.css";
import Image from "next/image";

const HomeFooter = () => {
  return (
    <div className={styles.styledFooter}>
      <Container>
        <div className={styles.homeFooterContainer}>
          <span className={styles.footerLeft}>©codeit - 2024</span>
          <div className={styles.footerMid}>
            <span>Privacy Policy</span>
            <span>FAQ</span>
          </div>
          <div className={styles.footerSns}>
            <Image
              className={styles.footerSnsImg}
              src="/images/ic_facebook.png"
              alt="페이스북"
              width={20}
              height={20}
            />
            <Image
              className={styles.footerSnsImg}
              src="/images/ic_twitter.png"
              alt="트위터"
              width={20}
              height={20}
            />
            <Image
              className={styles.footerSnsImg}
              src="/images/ic_youtube.png"
              alt="유튜브"
              width={20}
              height={20}
            />
            <Image
              className={styles.footerSnsImg}
              src="/images/ic_instagram.png"
              alt="인스타그램"
              width={20}
              height={20}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeFooter;
