import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
} from "@/src/utils/ValidationUtils";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import aixos from "@/src/lib/axios";
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

const Signup: NextPage<LoginProps> = ({ hideHeader }) => {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const handleError = (
    message: string,
    validateFn: () => string | undefined
  ) => {
    setErrorMessages((prev) => {
      const error = validateFn();
      return error
        ? [...prev, error]
        : prev.filter((msg) => !msg.includes(message));
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMessages: string[] = [];

    const emailError = validateEmail(email);
    if (emailError) errorMessages.push(emailError);

    const nicknameError = validateName(nickname);
    if (nicknameError) errorMessages.push(nicknameError);

    const passwordError = validatePassword(password);
    if (passwordError) errorMessages.push(passwordError);

    const confirmPasswordError = validateConfirmPassword(
      password,
      passwordConfirmation
    );
    if (confirmPasswordError) errorMessages.push(confirmPasswordError);

    setErrorMessages(errorMessages);

    if (errorMessages.length > 0) return;

    try {
      const res = await aixos.post<SignInResponse>("/auth/signUp", {
        email,
        nickname,
        password,
        passwordConfirmation,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      router.push("/login");
    } catch (error) {
      const axiosError = error as AxiosError;

      const message =
        axios.isAxiosError(axiosError) && axiosError.response
          ? (axiosError.response.data as { message?: string }).message ||
            "회원가입 실패"
          : "회원가입 중 오류가 발생했습니다.";
      setErrorMessages((prev) => [...prev, message]);
    }
  };

  return (
    <div id="signup">
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
                onBlur={() => handleError("이메일", () => validateEmail(email))}
                errorMessage={errorMessages.find((msg) =>
                  msg.includes("이메일")
                )}
                placeholder="이메일을 입력해주세요"
              />
            </div>
            <div>
              <label htmlFor="name">닉네임</label>
              <InputField
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onBlur={() =>
                  handleError("닉네임", () => validateName(nickname))
                }
                errorMessage={errorMessages.find((msg) =>
                  msg.includes("닉네임")
                )}
                placeholder="닉네임을 입력해주세요"
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
                    handleError("비밀번호", () => validatePassword(password))
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
            <div className="pwd-wrapper">
              <label htmlFor="chk-password">비밀번호 확인</label>
              <div className={styles["pwd-box"]}>
                <InputField
                  id="chk-password"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  onBlur={() =>
                    handleError("비밀번호", () =>
                      validateConfirmPassword(password, passwordConfirmation)
                    )
                  }
                  errorMessage={errorMessages.find((msg) =>
                    msg.includes("비밀번호")
                  )}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                />
                <span
                  className={`${styles["pwd-icon"]} ${
                    isConfirmPasswordVisible
                      ? styles["variant"]
                      : styles["default"]
                  }`}
                  onClick={toggleConfirmPasswordVisibility}
                ></span>
              </div>
            </div>
            <button
              type="submit"
              className={`${styles["btn-box"]} ${styles["large"]}`}
            >
              회원가입
            </button>
            <div className={styles["simple-login"]}>
              <p>간편 로그인하기</p>
              <ul className={styles["simple-sns"]}>
                <li>
                  <a
                    href="https://www.google.com/"
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
              이미 회원이신가요?<Link href="/login">로그인</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

Signup.getInitialProps = async () => {
  return { hideHeader: true };
};

export default Signup;
