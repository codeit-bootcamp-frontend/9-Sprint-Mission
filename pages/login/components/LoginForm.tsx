import Image from "next/image";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

function LoginForm() {
  return (
    <div className={styles.loginform}>
      <Link href="/">
        <Image
          src="/images/fulllogo.svg"
          alt="로고 이미지"
          width="396"
          height="132"
        />
      </Link>
      <InputField
        label="이메일"
        name="email"
        type="email"
        placeholder="이메일을 입력해주세요."
      />
      <InputField
        label="비밀번호"
        name="password"
        type="text"
        placeholder="비밀번호를 입력해주세요."
      />
      <Button width="640px" height="56px" radius="40px" background=" #9CA3AF">
        로그인
      </Button>
      <div className={styles.simpleLogin}>
        <span>간편 로그인하기</span>
        <div className={styles.loginSNS}>
          <Link href="/">
            <Image
              className={styles.SNSImage}
              src="/images/google.svg"
              alt="로고 이미지"
              width="42"
              height="42"
            />
          </Link>
          <Link href="/">
            <Image
              className={styles.SNSImage}
              src="/images/kakaotalk.svg"
              alt="로고 이미지"
              width="42"
              height="42"
            />
          </Link>
        </div>
      </div>
      <div className={styles.footer}>
        <p>
          판다마켓이 처음이신가요?{" "}
          <Link className={styles.footerLink} href="/signup">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
