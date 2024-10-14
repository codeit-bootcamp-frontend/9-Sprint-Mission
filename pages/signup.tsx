import { SignBtn } from "@/components/SignBtn";
import { TextInput } from "@/components/TextInput";
import Link from "next/link";
import styles from "./signup.module.css";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { States } from "@/types/types";

export default function Signup() {
  const [value, setValue] = useState<States>({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const newVaule: string = e.target.value;
    setValue((prev) => ({
      ...prev,
      email: newVaule,
    }));
  };
  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const newVaule: string = e.target.value;
    setValue((prev) => ({
      ...prev,
      nickname: newVaule,
    }));
  };
  const handleChangePW = (e: ChangeEvent<HTMLInputElement>) => {
    const newVaule: string = e.target.value;
    setValue((prev) => ({
      ...prev,
      password: newVaule,
    }));
  };
  const handleChangePWCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const newVaule: string = e.target.value;
    setValue((prev) => ({
      ...prev,
      passwordCheck: newVaule,
    }));
  };

  let active = false;
  // validation
  // button activation
  if (
    value.email !== "" &&
    value.nickname !== "" &&
    value.password !== "" &&
    value.passwordCheck !== ""
  ) {
    active = true;
  }

  const handleSubmitSignup = () => {
    //회원가입 api
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
          value={value.email}
          onChange={handleChangeEmail}
        >
          이메일
        </TextInput>

        <TextInput
          type="text"
          label="nickname"
          placeholder="닉네임을 입력해주세요"
          required
          value={value.nickname}
          onChange={handleChangeNickname}
        >
          닉네임
        </TextInput>
        <TextInput
          type="password"
          label="password"
          placeholder="비밀번호를 입력해주세요"
          required
          value={value.password}
          onChange={handleChangePW}
        >
          비밀번호
        </TextInput>
        <TextInput
          type="password"
          label="passwordCheck"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          required
          value={value.passwordCheck}
          onChange={handleChangePWCheck}
        >
          비밀번호 확인
        </TextInput>
        <SignBtn active={active}>회원가입</SignBtn>
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
          이미 회원이신가요?
          <Link className={styles.link} href="/login">
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
