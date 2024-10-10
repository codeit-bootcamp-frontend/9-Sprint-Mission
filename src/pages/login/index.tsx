import { NextPage } from "next";
import { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "@/src/utils/ValidationUtils";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import axiosInstance from "@/src/lib/axios";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/logo/logo-panda.png";
import Google from "@/public/assets/icon/login-google.svg";
import Kakao from "@/public/assets/icon/login-kakao.svg";
import InputField from "@/src/components/features/InputField";
import styles from "@/src/styles/Auth.module.scss";

// 서버 응답 데이터의 타입 정의
interface SignInResponse {
  accessToken: string;
  message?: string; // 필요한 다른 필드도 여기에 추가
}

// props 타입 정의
interface LoginProps {
  hideHeader: boolean;
}

const Login: NextPage<LoginProps> = ({ hideHeader }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지에서 accessToken 확인
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/"); // accessToken이 존재하면 홈 페이지로 리다이렉트
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMessages: string[] = [];

    // 이메일 및 비밀번호 유효성 검사
    const emailError = validateEmail(email);
    if (emailError) errorMessages.push(emailError);

    const passwordError = validatePassword(password);
    if (passwordError) errorMessages.push(passwordError);

    setErrorMessages(errorMessages);

    if (errorMessages.length > 0) return;

    // 로그인 요청
    try {
      const res = await axiosInstance.post<SignInResponse>("/auth/signIn", {
        email,
        password,
      });
      localStorage.setItem("accessToken", res.data.accessToken); // accessToken 저장
      router.push("/"); // 로그인 성공 후 홈으로 이동
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axios.isAxiosError(axiosError) && axiosError.response) {
        const errorMessage =
          (axiosError.response.data as { message?: string }).message ||
          "로그인 중 오류가 발생했습니다.";
        setErrorMessages((prev) => [...prev, errorMessage]);
      } else {
        setErrorMessages((prev) => [...prev, "로그인 중 오류가 발생했습니다."]);
      }
    }
  };
  return (
    <div id="login" className={styles["login"]}>
      <div className="container2">
        <h1 className="sub-logo">
          <Link href="/">
            <Image src={Logo} fill alt="판다마켓" />
          </Link>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className={styles["enter-box"]}>
            <div>
              <label htmlFor="email">이메일</label>
              <InputField
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() =>
                  setErrorMessages((prev) => {
                    const error = validateEmail(email);
                    return error
                      ? [...prev, error]
                      : prev.filter((msg) => !msg.includes("이메일"));
                  })
                }
                errorMessage={errorMessages.find((msg) =>
                  msg.includes("이메일")
                )}
                placeholder="이메일을 입력해주세요"
              />
            </div>
            <div className="pwd-wrapper">
              <label htmlFor="password">비밀번호</label>
              <div className={styles["pwd-box"]}>
                <InputField
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() =>
                    setErrorMessages((prev) => {
                      const error = validatePassword(password);
                      return error
                        ? [...prev, error]
                        : prev.filter((msg) => !msg.includes("비밀번호"));
                    })
                  }
                  errorMessage={errorMessages.find((msg) =>
                    msg.includes("비밀번호")
                  )}
                  placeholder="비밀번호를 입력해주세요."
                />
                <span
                  className={`${styles["pwd-icon"]} ${
                    isPasswordVisible ? styles["variant"] : styles["default"]
                  }`}
                  onClick={togglePasswordVisibility}
                ></span>
              </div>
            </div>
            <button
              type="submit"
              className={`${styles["btn-box"]} ${styles["large"]}`}
            >
              로그인
            </button>
            <div className={styles["simple-login"]}>
              <p>간편 로그인하기</p>
              <ul className={styles["simple-sns"]}>
                <li>
                  <a
                    href="https://www.google.com/."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={Google}
                      width={42}
                      height={42}
                      alt="구글로 로그인하기"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.kakaocorp.com/page/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={Kakao}
                      width={42}
                      height={42}
                      alt="카카오로 로그인하기"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <p className={styles["txt-joinus"]}>
              판다마켓이 처음이신가요?<Link href="/signup">회원가입</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.getInitialProps = async () => {
  return { hideHeader: true };
};

export default Login;
