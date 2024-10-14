import { SignBtn } from "@/components/SignBtn";
import { TextInput } from "@/components/TextInput";
import Link from "next/link";
import styles from "./signup.module.css";
import Image from "next/image";

export default function login() {
  const handleChangeEmail = () => {};
  let active = false;
  const handleSubmitSignup = () => {
    //로그인 api
  };

  return (
    <div className={styles.wrap}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/logo-big.png"
          alt="판다마켓"
          width={396}
          height={132}
        />
      </Link>
      <form className={styles.form} onSubmit={handleSubmitSignup}>
        <TextInput
          type="email"
          label="email"
          placeholder="이메일을 입력해주세요"
          required
          value=""
          onChange={handleChangeEmail}
        >
          이메일
        </TextInput>

        <TextInput
          type="password"
          label="password"
          placeholder="비밀번호를 입력해주세요"
          required
          value=""
          onChange={handleChangeEmail}
        >
          비밀번호
        </TextInput>

        <SignBtn active={active}>로그인</SignBtn>
        <div className={styles["social-login"]}>
          <div className={styles.text}>간편 로그인하기</div>
          <div className={styles.social}>
            <Link href="">
              <Image src="/google.png" alt="구글" width={42} height={42} />
            </Link>
            <Link href="">
              <Image src="/kakao.png" alt="카카오" width={42} height={42} />
            </Link>
          </div>
        </div>

        <div className={styles["link-wrap"]}>
          판다마켓이 처음이신가요?
          <Link className={styles.link} href="/signup">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
