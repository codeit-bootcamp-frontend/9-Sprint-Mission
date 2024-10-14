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

export default function SignUpPage() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState({
    password: false,
    confirm: false,
  });

  const [userData, setUserData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const [isTouched, setIsTouched] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordConfirmation: false,
  });

  let isDataComplete =
    isTouched.email &&
    isTouched.password &&
    isTouched.nickname &&
    isTouched.passwordConfirmation;

  const [dataIsValidate, setDataIsValidate] = useState({
    emailFormat: true,
    passwordFormat: true,
    nicknameFormat: true,
    passwordConfirmFormat: true,
  });

  const toggleVisibility = (field: string) => {
    setIsVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateInputData = () => {
    const {
      isValidEmail,
      isValidPassword,
      isValidNickName,
      isValidPasswordConfirm,
    } = validateUserData(userData);
    setDataIsValidate({
      emailFormat: isValidEmail,
      passwordFormat: isValidPassword,
      nicknameFormat: isValidNickName,
      passwordConfirmFormat: isValidPasswordConfirm,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: String(value),
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setIsTouched((prev) => ({ ...prev, [name]: true }));
    validateInputData(); // 포커스가 벗어났을 때만 유효성 검사
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await instance.post("/auth/signUp", userData);
      console.log("회원가입 성공:", response.data);
      router.push("/signin");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) router.push(`/`);
    validateInputData();
  }, [userData]);

  return (
    <Container>
      <Image src={logo} width={396} height={132} alt="panda market" />
      <form action="submit" onSubmit={handleSubmit}>
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
          label="닉네임"
          type="text"
          name="nickname"
          value={userData.nickname}
          placeholder="닉네임을 입력해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          isTouched={isTouched.nickname}
          errorMessage={
            !dataIsValidate.nicknameFormat && "닉네임을 입력해주세요"
          }
        />
        <CustomInput
          label="비밀번호"
          type="password"
          name="password"
          value={userData.password}
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          isTouched={isTouched.password}
          errorMessage={
            !dataIsValidate.passwordFormat && "비밀번호를 8자 이상 입력해주세요"
          }
          isVisible={isVisible.password}
          toggleVisibility={() => toggleVisibility("password")}
        />
        <CustomInput
          label="비밀번호 확인"
          type="password"
          name="passwordConfirmation"
          value={userData.passwordConfirmation}
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          isTouched={isTouched.passwordConfirmation}
          errorMessage={
            !dataIsValidate.passwordConfirmFormat &&
            "비밀번호가 일치하지 않습니다"
          }
          isVisible={isVisible.confirm}
          toggleVisibility={() => toggleVisibility("confirm")}
        />
        <SignUpButton type="submit" disabled={!isDataComplete}>
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
