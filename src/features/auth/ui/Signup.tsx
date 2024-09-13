import { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as LogoPanda } from "../../../shared/assets/images/logo/logo_panda.svg";
import InputItem from "../../../shared/ui/InputItem";
import SocialLogin from "./SocialLogin";
import PasswordInput from "./PasswordInput";
import useDebounce from "../../../shared/hooks/useDebounce";
import { getErrorMessage, AuthInputId } from "../utils/authUtils";

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

const ErrorText = styled.div`
  color: var(--red);
  font-size: 12px;
  margin-top: -16px;
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
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface ErrorState {
  email?: string;
  nickname?: string;
  password?: string;
  passwordConfirmation?: string;
}

export const Signup: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});

  const debouncedPassword = useDebounce(formState.password, 500);
  const debouncedPasswordConfirmation = useDebounce(
    formState.passwordConfirmation,
    500
  );

  useEffect(() => {
    if (debouncedPassword) {
      const passwordError = getErrorMessage("password", debouncedPassword);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
      }));
    }
    if (debouncedPasswordConfirmation) {
      const passwordConfirmationError = getErrorMessage(
        "passwordConfirmation",
        debouncedPasswordConfirmation,
        formState.password
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirmation: passwordConfirmationError,
      }));
    }
  }, [debouncedPassword, debouncedPasswordConfirmation, formState.password]);

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
    const errorMessage = getErrorMessage(
      id as AuthInputId,
      value,
      formState.password
    );
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: getErrorMessage("email", formState.email),
      nickname: getErrorMessage("nickname", formState.nickname),
      password: getErrorMessage("password", formState.password),
      passwordConfirmation: getErrorMessage(
        "passwordConfirmation",
        formState.passwordConfirmation,
        formState.password
      ),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {
      // TODO: 회원가입 API 처리
    }
  };

  return (
    <AuthContainer>
      <LogoHomeLink href="/">
        <LogoPanda title="판다마켓 로고" />
      </LogoHomeLink>

      <Form id="signupForm" method="post" onSubmit={handleSubmit}>
        <InputItem
          id="email"
          label="이메일"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이메일을 입력해 주세요"
          errorMessage={errors.email}
        />

        <InputItem
          id="nickname"
          label="닉네임"
          value={formState.nickname}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="닉네임을 입력해 주세요"
          errorMessage={errors.nickname}
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

        <PasswordInput
          id="passwordConfirmation"
          label="비밀번호 확인"
          value={formState.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          errorMessage={errors.passwordConfirmation}
        />

        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>

      <SocialLoginContainer>
        <SocialLogin />
      </SocialLoginContainer>

      <AuthSwitch>
        이미 회원이신가요? <Link to="/login">로그인</Link>
      </AuthSwitch>
    </AuthContainer>
  );
};
