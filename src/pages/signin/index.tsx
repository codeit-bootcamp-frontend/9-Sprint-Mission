import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import logo from "@/assets/images/logo/logo.svg";
import kakao from "@/assets/images/social/kakao-logo.png";
import google from "@/assets/images/social/google-logo.png";
import instance from "@/api/axios";
import validateUserData from "@/util/validateUserData";
import CustomInput from "@/components/ui/common/CustomInput";

export default function SignInPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [dataIsValidate, setDataIsValidate] = useState({
    emailFormat: true,
    passwordFormat: true,
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isTouched, setIsTouched] = useState({
    email: false,
    password: false,
  });
  let userDataExist = isTouched.email && isTouched.password;

  const togglePasswordVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevuserData) => ({
      ...prevuserData,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setIsTouched((prev) => ({ ...prev, [name]: true }));
    validateInputData();
  };

  const validateInputData = () => {
    const { isValidEmail, isValidPassword } = validateUserData(userData);
    setDataIsValidate({
      emailFormat: isValidEmail,
      passwordFormat: isValidPassword,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await instance.post(`/auth/signIn`, userData);
      const { accessToken } = res.data;
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      router.push("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 토큰이 저장된 후에만 페이지 이동
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push(`/`); // 토큰이 잇다면 홈페이지로 리다이렉트
    }
    validateInputData();
  }, [userData]);

  return (
    <Container>
      <Image src={logo} width={396} height={132} alt="panda market" />
      <form onSubmit={handleSubmit}>
        <CustomInput
          label="이메일"
          type="email"
          name="email"
          value={userData.email}
          placeholder="이메일을 입력해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          isTouched={isTouched.email}
          errorMessage={!dataIsValidate.emailFormat && "잘못된 이메일입니다"}
        />
        <CustomInput
          label="비밀번호"
          type={isVisible ? "text" : "password"}
          name="password"
          value={userData.password}
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          isTouched={isTouched.password}
          errorMessage={
            !dataIsValidate.passwordFormat && "비밀번호를 8자 이상 입력해주세요"
          }
          isVisible={isVisible}
          toggleVisibility={togglePasswordVisible}
        />
        <SignInButton type="submit" disabled={!userDataExist}>
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
