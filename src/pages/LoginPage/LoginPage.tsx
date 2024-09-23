import LoginContainer from "./components/LoginContainer";
import LogoImg from "../../assets/logo.svg";
import styled from "styled-components";
import LoginInput from "./components/LoginInput";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();
  return (
    <LoginContainer>
      <Logo onClick={() => nav("/")} src={LogoImg} alt="로고" />
      <LoginInput
        text="이메일"
        name="email"
        placeholder="이메일을 입력해주세요"
      />
      <LoginInput
        text="닉네임"
        name="nickname"
        placeholder="닉네임을 입력해주세요"
      />
    </LoginContainer>
  );
};

export default LoginPage;

const Logo = styled.img`
  width: 396px;
  height: 132px;
  margin-bottom: 40px;
  cursor: pointer;
`;
