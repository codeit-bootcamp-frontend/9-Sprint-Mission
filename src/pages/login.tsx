import styles from "@/src/styles/login.module.css";
import Image from "next/image";
import Google from "@/src/assets/logo/logo_google.png";
import KaKaoTalk from "@/src/assets/logo/logo_kakaotalk.png";
import Panda from "@/src/assets/logo/logo_panda.png";
import Link from "next/link";
import axios from "@/src/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "email") {
      setIsEmailError(!value || !emailRegex.test(value));
    }
    if (name === "password") {
      setIsPasswordError(!value || value.length < 8);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/signIn", values);

      const accessToken = response.data.accessToken;

      localStorage.setItem("accessToken", accessToken);

      router.push("/");
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  const handleTogglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const isFormValid = isEmailError || isPasswordError;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <header className={styles["header-container"]}>
        <h1>
          <Link className={styles["logo-container"]} href="./">
            <Image src={Panda} width="396" height="132" alt="판다마켓" />
          </Link>
        </h1>
      </header>

      <main className={styles["login-container"]}>
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <label
            className={`${styles["login-label"]} ${styles.email}`}
            htmlFor="email"
          >
            이메일
          </label>
          <input
            className={styles["login-input"]}
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
          />
          {isEmailError && (
            <em className={styles["error-msg"]}>
              {values.email
                ? "잘못된 이메일 형식입니다"
                : "이메일을 입력해주세요"}
            </em>
          )}
          <label className={styles["login-label"]} htmlFor="password">
            비밀번호
          </label>
          <div className={styles["password-container"]}>
            <input
              className={`${styles["login-input"]} ${styles.password}`}
              id="password"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
            />
            <button
              className={`${styles["password-hide"]} ${
                isPasswordVisible ? styles["password-no-hide"] : ""
              }`}
              type="button"
              onClick={handleTogglePassword}
            >
              <span className="blind">비밀번호 보기</span>
            </button>
            {isPasswordError && (
              <em className={styles["error-msg"]}>
                {values.password
                  ? "비밀번호는 최소 8자리 이상이어야 합니다"
                  : "비밀번호를 입력해주세요"}
              </em>
            )}
          </div>
          <button
            className={styles["login-button"]}
            type="submit"
            disabled={isFormValid}
          >
            로그인
          </button>
        </form>
        <div className={styles["login-simple"]}>
          <span className={styles["simple-login"]}>간편 로그인하기</span>
          <Link href="https://google.com">
            <Image src={Google} width="44" height="44" alt="구글" />
          </Link>
          <Link href="https://kakao.com">
            <Image src={KaKaoTalk} width="44" height="44" alt="카카오톡" />
          </Link>
        </div>
        <div className={styles["login-first"]}>
          <em>
            판다마켓이 처음이신가요?
            <Link className={styles["sign-up"]} href="/register">
              회원가입
            </Link>
          </em>
        </div>
      </main>
    </>
  );
}
