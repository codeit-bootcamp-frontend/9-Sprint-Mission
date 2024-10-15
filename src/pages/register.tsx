import styles from "@/src/styles/login.module.css";
import Image from "next/image";
import Google from "@/src/assets/logo/logo_google.png";
import KaKaoTalk from "@/src/assets/logo/logo_kakaotalk.png";
import Panda from "@/src/assets/logo/logo_panda.png";
import Link from "next/link";
import axios from "@/src/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [isEmailError, setIsEmailError] = useState(false);
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordConfirmationError, setIsPasswordConfirmationError] =
    useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false);

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
    if (name === "nickname") {
      setIsNicknameError(!value);
    }
    if (name === "password") {
      setIsPasswordError(!value || value.length < 8);
    }
    if (name === "passwordCheck") {
      setIsPasswordConfirmationError(values.password !== value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signUp", values);
      router.push("/login");
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  const handleTogglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleTogglePasswordCheck = () => {
    setIsPasswordCheckVisible((prev) => !prev);
  };

  const isFormValid =
    isEmailError ||
    isNicknameError ||
    isPasswordError ||
    isPasswordConfirmationError;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <header className={styles["header-container"]}>
        <h1>
          <Link className={styles["logo-container"]} href="/">
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
          <label className={styles["login-label"]} htmlFor="nickname">
            닉네임
          </label>
          <input
            className={styles["login-input"]}
            id="nickname"
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요"
          />
          {isNicknameError && (
            <em className={styles["error-msg"]}>닉네임을 입력해주세요</em>
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
          </div>
          {isPasswordError && (
            <em className={styles["error-msg"]}>
              {values.password
                ? "비밀번호는 최소 8자리 이상이어야 합니다"
                : "비밀번호를 입력해주세요"}
            </em>
          )}
          <label
            className={styles["login-label"]}
            htmlFor="passwordConfirmation"
          >
            비밀번호 확인
          </label>
          <div className={styles["password-container"]}>
            <input
              className={`${styles["login-input"]} ${styles.password}`}
              id="passwordConfirmation"
              name="passwordConfirmation"
              type={isPasswordCheckVisible ? "text" : "password"}
              value={values.passwordConfirmation}
              onChange={handleChange}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
            <button
              className={`${styles["password-hide"]} ${
                isPasswordCheckVisible ? styles["password-no-hide"] : ""
              }`}
              type="button"
              onClick={handleTogglePasswordCheck}
            >
              <span className="blind">비밀번호 보기</span>
            </button>
          </div>
          {isPasswordConfirmationError && (
            <em className={styles["error-msg"]}>
              비밀번호가 일치하지 않습니다
            </em>
          )}
          <button
            className={styles["login-button"]}
            type="submit"
            disabled={isFormValid}
          >
            회원가입
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
            이미 회원이신가요?
            <Link className={styles["sign-up"]} href="/login">
              로그인
            </Link>
          </em>
        </div>
      </main>
    </div>
  );
}
