import logoImg from "../assets/판다얼굴.svg";
import logoText from "../assets/판다마켓.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = () => {
  return (
    <LogoLink to="/">
      <img
        className="logo-img"
        src={logoImg}
        alt="로고이미지"
        width="40"
        height="40"
      />
      <img
        className="logo-text"
        src={logoText}
        alt="판다마켓"
        width="103"
        height="35"
      />
    </LogoLink>
  );
};

export default Logo;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8.59px;
  width: 153px;
  height: 51px;

  @media (max-width: 768px) {
    width: 81px;
    height: 40px;

    .logo-img {
      display: none;
    }

    .logo-text {
      width: 81px;
      height: 40px;
    }
  }
`;
