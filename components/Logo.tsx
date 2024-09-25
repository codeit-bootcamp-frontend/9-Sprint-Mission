import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Logo.module.css";

const Logo = () => {
  return (
    <Link href="/" className={styles.logoLink}>
      <Image
        className={styles.logoImg}
        src="/images/판다얼굴.svg"
        alt="로고이미지"
        width={40}
        height={40}
      />
      <Image
        className={styles.logoText}
        src="images/판다마켓.svg"
        alt="판다마켓"
        width={103}
        height={35}
      />
    </Link>
  );
};

export default Logo;
