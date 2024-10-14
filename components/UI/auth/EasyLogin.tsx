import Link from "next/link";
import Image from "next/image";
import styles from "./EasyLogin.module.scss";
import GoogleLogin from "@/assets/images/social/google-logo.png";
import KakaoLogin from "@/assets/images/social/kakao-logo.png";

interface Props {
  txt: string;
  link: string;
  button: string;
}

const EasyLogin = ({ txt, link, button }: Props) => {
  return (
    <>
      <div className={styles.easyLoginWrap}>
        <p>간편 로그인하기</p>
        <div className={styles.loginIcon}>
          <Link href="https://www.google.com/">
            <Image src={GoogleLogin} width={42} height={42} alt="google" />
          </Link>
          <Link href="https://www.kakaocorp.com/page/">
            <Image src={KakaoLogin} width={42} height={42} alt="kakao" />
          </Link>
        </div>
      </div>

      <div className={styles.linkWrap}>
        <p>{txt}</p>
        <Link href={link}>{button}</Link>
      </div>
    </>
  );
};

export default EasyLogin;
