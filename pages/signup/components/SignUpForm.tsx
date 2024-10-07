import Link from "next/link";
import styles from "./SignUpForm.module.css";
import Image from "next/image";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

function SignUpForm() {
  return (
    <div className={styles.signupformContainer}>
      <div className={styles.signupform}>
        <Link href="/">
          <Image
            src="/images/fulllogo.svg"
            alt="로고 이미지"
            width="396"
            height="132"
          />
        </Link>
        <form className={styles.InputBox}>
          <InputField
            label="이메일"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요."
          />
          <InputField
            label="닉네임"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
          />
          <InputField
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <InputField
            label="비밀번호 확인"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
          />
        </form>
        <Button width="640px" height="56px" radius="40px" background=" #9CA3AF">
          회원가입
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
            이미 회원이신가요?
            <Link className={styles.footerLink} href="/login">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
