import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/context/Authcontext";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import logo from "@/assets/images/logo/logo.svg";
import kakao from "@/assets/images/social/kakao-logo.png";
import google from "@/assets/images/social/google-logo.png";
import visibleIcon from "@/assets/images/icons/eye-visible.svg";
import invisibleIcon from "@/assets/images/icons/eye-invisible.svg";

interface SignUpFormData {
  email: string;
  password: string;
  nickname: string;
  passwordConfirm: string;
}

export default function SignUpPage() {
  const { user, signUp } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState({
    password: false,
    confirm: false,
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormData>({ mode: "onChange" });

  const togglePasswordVisible = (field: "password" | "confirm") => {
    setIsVisible((prev) => ({
      ...prev,
      [field]: !prev[field], // 필드별로 상태 관리
    }));
  };

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const { email, password, nickname, passwordConfirm } = data;
    await signUp(email, password, nickname, passwordConfirm);
  };

  useEffect(() => {
    console.log(user);
    if (user) router.replace("/");
  }, [user, router]); // router도 결국 객체, useEffect 안에서 사용하는 변수는 모두 추적해야하기 때문에 의존성배열에 추가해 준 모습.

  return (
    <Container>
      <Image src={logo} width={396} height={132} alt="panda market" />
      <form action="submit" onSubmit={handleSubmit(onSubmit)}>
        <InputWrap>
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            error={!!errors.email} // FieldError 타입을 boolean 타입으로 바꿔줌
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputWrap>
        <InputWrap>
          <label htmlFor="nickname">닉네임</label>
          <Input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            error={!!errors.nickname}
            {...register("nickname", {
              required: "닉네임은 필수 입력입니다.",
              minLength: {
                value: 1,
                message: "닉네임을 입력해 주세요.",
              },
            })}
          />
          {errors.nickname && (
            <ErrorMessage>{errors.nickname.message}</ErrorMessage>
          )}
        </InputWrap>
        <InputWrap>
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            type={isVisible.password ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요."
            error={!!errors.password}
            {...register("password", {
              required: "비밀번호는 필수 입력입니다.",
              minLength: {
                value: 8,
                message: "비밀번호를 8자 이상 입력해주세요",
              },
            })}
          />
          <VisibleButton
            type="button"
            onClick={() => togglePasswordVisible("password")}
          >
            <Image
              src={isVisible.password ? visibleIcon : invisibleIcon}
              width={24}
              height={24}
              alt="password visible button"
            />
          </VisibleButton>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputWrap>
        <InputWrap>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <Input
            id="passwordConfirm"
            type={isVisible.confirm ? "text" : "password"}
            placeholder="비밀번호를  입력해주세요."
            error={!!errors.passwordConfirm}
            {...register("passwordConfirm", {
              required: "비밀번호를 다시 입력해주세요.",
              validate: (value) =>
                value === watch("password") || "비밀번호가 일치하지 않습니다.",
            })}
          />
          <VisibleButton
            type="button"
            onClick={() => togglePasswordVisible("confirm")}
          >
            <Image
              src={isVisible.confirm ? visibleIcon : invisibleIcon}
              width={24}
              height={24}
              alt="password visible button"
            />
          </VisibleButton>
          {errors.passwordConfirm && (
            <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
          )}
        </InputWrap>
        <SignUpButton type="submit" disabled={!isValid || isSubmitting}>
          회원가입
        </SignUpButton>
      </form>
      <EazyLoginWrap>
        <span>간편 로그인하기</span>
        <Image src={google} width={42} height={42} alt="google login button" />
        <Image src={kakao} width={42} height={42} alt="kakao login button" />
      </EazyLoginWrap>
      <Div>
        이미 회원이신가요? <Link href="/signin">로그인</Link>
      </Div>
    </Container>
  );
}

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: 70px;
`;

const SignUpButton = styled.button`
  margin-top: 24px;
  width: 640px;
  height: 56px;
  padding: 16px 124px;
  border-radius: 40px;
  background-color: var(--blue);
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;

  &:disabled {
    background-color: var(--gray-400);
    color: white;
    cursor: not-allowed;
  }
`;

const EazyLoginWrap = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 640px;
  height: 74px;
  border-radius: 8px;
  background-color: #e6f2ff;
  padding: 16px 23px;

  & > :first-child {
    flex-grow: 1;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 23px;
  gap: 16px;

  & > :first-child {
    color: var(--blue);
    text-decoration: underline;
  }
`;

const InputWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 640px;
  margin-top: 24px;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  height: 56px;
  padding: 16px 24px;
  border-radius: 12px;
  background-color: var(--gray-100);
  color: var(--gray-400);

  border: 1px solid ${(props) => (props.error ? "#f74747" : "transparent")};

  &:focus {
    outline: none;
    border: 1px solid ${(props) => (props.error ? "#f74747" : "var(--blue)")};
  }
`;

const VisibleButton = styled.button`
  position: absolute;
  top: 53px;
  right: 20px;
  z-index: 1;
  width: 24px;
  height: 24px;
`;

const ErrorMessage = styled.p`
  padding-left: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #f74747;
`;
