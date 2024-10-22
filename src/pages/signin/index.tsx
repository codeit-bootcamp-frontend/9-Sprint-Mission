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

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { user, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<SignInFormData>({ mode: "onChange" });

  const togglePasswordVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    await login(data.email, data.password);
  };

  // 토큰이 저장된 후에만 페이지 이동
  useEffect(() => {
    console.log(user);
    if (user) router.replace("/");
  }, [user, router]);

  return (
    <Container>
      <Image src={logo} width={396} height={132} alt="panda market" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputWrap>
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            error={!!errors.email}
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{String(errors.email.message)}</ErrorMessage>
          )}
        </InputWrap>
        <InputWrap>
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            type={isVisible ? "text" : "password"}
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
          <VisibleButton type="button" onClick={togglePasswordVisible}>
            <Image
              src={isVisible ? visibleIcon : invisibleIcon}
              width={24}
              height={24}
              alt="password visible button"
            />
          </VisibleButton>
          {errors.password && (
            <ErrorMessage>{String(errors.password.message)}</ErrorMessage>
          )}
        </InputWrap>
        <SignInButton type="submit" disabled={!isValid || isSubmitting}>
          로그인
        </SignInButton>
      </form>
      <EazyLoginWrap>
        <span>간편 로그인하기</span>
        <Image src={google} width={42} height={42} alt="google login button" />
        <Image src={kakao} width={42} height={42} alt="kakao login button" />
      </EazyLoginWrap>
      <Div>
        판다마켓이 처음이신가요? <Link href="/signup">회원가입</Link>
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
`;

const SignInButton = styled.button`
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
    background-color: var(--gray-400); /* 비활성화 상태일 때의 색상 */
    color: white; /* 비활성화 상태일 때의 글자 색상 */
    cursor: not-allowed; /* 비활성화 상태일 때 커서 */
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

const VisibleButton = styled.button`
  position: absolute;
  top: 53px;
  right: 20px;
  z-index: 1;
  width: 24px;
  height: 24px;
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

const ErrorMessage = styled.p`
  padding-left: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #f74747;
`;
