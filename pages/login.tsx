import { SignBtn } from "@/components/SignBtn";
import { TextInput } from "@/components/TextInput";
import Link from "next/link";
import styles from "./signup.module.css";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { States } from "@/types/types";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

export default function Login() {
  const [value, setValue] = useState<States>({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const handleChange = (
    key: keyof typeof value,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newVaule: string = e.target.value;
    setValue((prev) => ({
      ...prev,
      [key]: newVaule,
    }));
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    handleChange("email", e);

  const handleChangePW = (e: ChangeEvent<HTMLInputElement>) =>
    handleChange("password", e);

  let active = false;
  // validation
  // button activation
  if (value.email !== "" && value.password !== "") {
    active = true;
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmitSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let res;
    try {
      setLoading(true);
      res = await axios.post(`/auth/signIn`, {
        email: value.email,
        password: value.password,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      alert("로그인 성공");
      router.push("/");
    } catch (err) {
      console.log(err);
      console.log(err);
      setError(false);
    } finally {
      setLoading(false);
    }
  };

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    router.push("/");
  }

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
          type="password"
          label="password"
          placeholder="비밀번호를 입력해주세요"
          required
          value={value.password}
          onChange={handleChangePW}
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
