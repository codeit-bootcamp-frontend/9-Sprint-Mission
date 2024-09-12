import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../shared/assets/images/logo/logo.svg"; // SVG는 ReactComponent로 임포트
import Avatar from "../../shared/assets/images/login/default_avatar.png"; // PNG는 경로로 임포트

// Styled Components
const GlobalHeader = styled.header`
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100%; /* 화면 전체 너비로 설정 */
  height: var(--header-height); /* height를 CSS 변수로 설정 */
  display: flex;
  justify-content: space-between; /* 전체 헤더를 수평 가운데 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 10px 0; /* 전체 헤더에 상하 패딩 추가 */
  background-color: #ffffff;
  border-bottom: 1px solid #dfdfdf;
  z-index: 1000; /* 다른 요소보다 위에 표시되도록 설정 */
`;

const HeaderLeft = styled.div`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const HeaderLogo = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 16px;
  position: relative;
  top: 0;
  left: 0;

  @media (min-width: 768px) {
    margin-right: 30px;
    top: 16px; /* 로고를 약간 하단으로 이동 */
    left: 20px; /* 로고를 더 오른쪽으로 이동 */
  }

  @media (min-width: 1200px) {
    margin-right: 50px;
  }
`;

const LogoTitle = styled.span`
  color: var(--blue-100);
  font-family: "ROKAF Sans", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  margin-left: 10px;
  float: right;

  @media (min-width: 768px) {
    font-size: 25px;
    line-height: 50px;
    margin-bottom: 30px;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    gap: 8px;
    font-weight: bold;
    font-size: 16px;
    color: #4b5563;

    @media (min-width: 768px) {
      gap: 36px;
      font-size: 18px;
    }
  }
`;

const HeaderMenu = styled(NavLink)`
  color: var(--gray-600);
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  text-decoration: none;

  &.active {
    color: var(--blue-100);
  }

  &:hover {
    color: var(--blue-200);
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  img {
    width: 40px;
    height: 40px;
    margin-right: 20px; /* 아바타 이미지를 더 왼쪽으로 이동 */
  }
`;

const getMobileSize = () => window.innerWidth < 768;

function Header() {
  const [isMobileSize, setIsMobileSize] = useState(getMobileSize);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSize(getMobileSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <GlobalHeader>
      <HeaderLeft>
        <HeaderLogo to="/" aria-label="홈으로 이동">
          <div>
            {!isMobileSize && <Logo aria-hidden="true" />}
            <LogoTitle>판다마켓</LogoTitle>
          </div>
        </HeaderLogo>
        <Nav>
          <ul>
            <li>
              <HeaderMenu to="/board">자유게시판</HeaderMenu>
            </li>
            <li>
              <HeaderMenu to="/items">중고마켓</HeaderMenu>
            </li>
          </ul>
        </Nav>
      </HeaderLeft>
      <HeaderRight>
        <img src={Avatar} alt="기본 아바타" />
      </HeaderRight>
    </GlobalHeader>
  );
}

export default Header;
