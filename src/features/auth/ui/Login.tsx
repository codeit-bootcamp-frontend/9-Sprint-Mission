// Login.tsx
import { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoggedInAtom, userImageAtom } from "../../../shared/store/authAtoms";
import styled from "styled-components";
import { ReactComponent as LogoPanda } from "../../../shared/assets/images/logo/logo_panda.svg";
import InputItem from "../../../shared/ui/InputItem";
import SocialLogin from "./SocialLogin";
import PasswordInput from "./PasswordInput";
import useDebounce from "../../../shared/hooks/useDebounce";
import { getErrorMessage, AuthInputId } from "../utils/authUtils";
import { authSignIn } from "../api/auth"; // authSignIn 함수 임포트

// Styled components
const AuthContainer = styled.main`
  padding: 24px 16px;
  max-width: 432px;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 640px;
    padding: 48px 0;
  }

  @media (min-width: 1200px) {
    padding: 60px 0;
  }
`;

const LogoHomeLink = styled.a`
  display: block;
  margin-bottom: 24px;
  text-align: center;

  img {
    width: 198px;

    @media (min-width: 768px) {
      width: 396px;
    }
  }

  @media (min-width: 1200px) {
    margin-bottom: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AuthSwitch = styled.div`
  font-weight: 500;
  font-size: 15px;
  text-align: center;

  a {
    color: var(--blue-50);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--blue-100);
  color: #ffffff;
  padding: 14.5px 33.5px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: var(--blue-200);
  }

  &:focus {
    background-color: var(--blue-300);
  }

  &:disabled {
    background-color: var(--gray-400);
    cursor: default;
  }
`;

const SocialLoginContainer = styled.div`
  margin-top: 24px;
  text-align: center;

  img {
    margin: 0 12px;
  }
`;

interface FormState {
  email: string;
  password: string;
}

interface ErrorState {
  email?: string;
  password?: string;
}

export const Login: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom); // Jotai atom
  const [userImage, setUserImage] = useAtom(userImageAtom); // Jotai atom
  const navigate = useNavigate(); // useNavigate 훅 사용

  const debouncedPassword = useDebounce(formState.password, 500);

  useEffect(() => {
    if (debouncedPassword) {
      const passwordError = getErrorMessage("password", debouncedPassword);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
      }));
    }
  }, [debouncedPassword]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const errorMessage = getErrorMessage(id as AuthInputId, value);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: getErrorMessage("email", formState.email),
      password: getErrorMessage("password", formState.password),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {
      const result = await authSignIn({
        email: formState.email,
        password: formState.password,
      });

      if (result) {
        // 로그인 성공 시 전역 상태 업데이트
        sessionStorage.setItem("userId", result.user.id);
        if (result.user.image) {
          sessionStorage.setItem("userImage", result.user.image);
          setUserImage(result.user.image);
        }

        // Jotai 상태 업데이트
        setIsLoggedIn(true);

        // 세션 스토리지와 header 컴포넌트 랜더링 시간 차이 때문이 어쩔 수 없이 사용
        window.location.reload();
      }
    }
  };

  return (
    <AuthContainer>
      <LogoHomeLink href="/">
        <LogoPanda title="판다마켓 로고" />
      </LogoHomeLink>

      <Form id="loginForm" method="post" onSubmit={handleSubmit}>
        <InputItem
          id="email"
          label="이메일"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이메일을 입력해 주세요"
          errorMessage={errors.email}
        />

        <PasswordInput
          id="password"
          label="비밀번호"
          value={formState.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 입력해 주세요"
          errorMessage={errors.password}
        />

        <SubmitButton type="submit">로그인</SubmitButton>
      </Form>

      <SocialLoginContainer>
        <SocialLogin />
      </SocialLoginContainer>

      <AuthSwitch>
        판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
      </AuthSwitch>
    </AuthContainer>
  );
};
