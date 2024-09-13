import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../shared/assets/images/logo/logo.svg";
import Avatar from "../../shared/assets/images/login/default_avatar.png";

// Styled Components
const GlobalHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  background-color: #ffffff;
  border-bottom: 1px solid #dfdfdf;
  z-index: 1000;

  @media (min-width: 768px) {
    padding: 16px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 16px;

  @media (min-width: 768px) {
    margin-right: 30px;
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

  @media (min-width: 768px) {
    font-size: 25px;
    line-height: 50px;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
  color: var(--gray-600);

  @media (min-width: 768px) {
    gap: 36px;
    font-size: 18px;
  }
`;

const NavItem = styled.li`
  a {
    color: var(--gray-600);
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      color: var(--blue-200);
    }

    &.active {
      color: var(--blue-100);
    }
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
`;

const StyledButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 26px;
  color: white; /* 텍스트 색상을 흰색으로 설정 */
  background-color: var(--blue-100); /* 배경색을 var(--blue-100)로 설정 */
  padding: 12px 23px; /* 버튼처럼 보이도록 패딩 추가 */
  border-radius: 8px;
  text-decoration: none;
  width: 128px;
  height: 48px;
  cursor: pointer;

  &:hover {
    background-color: var(--blue-200); /* hover 시 배경색 변경 */
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
          {!isMobileSize && <Logo aria-hidden="true" />}
          <LogoTitle>판다마켓</LogoTitle>
        </HeaderLogo>

        <nav>
          <NavList>
            <NavItem>
              <NavLink
                to="/community"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                자유게시판
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/items"
                className={({ isActive }) =>
                  isActive || location.pathname === "/additem" ? "active" : ""
                }
              >
                중고마켓
              </NavLink>
            </NavItem>
          </NavList>
        </nav>
      </HeaderLeft>

      <HeaderRight>
        <StyledButtonLink to="/login">로그인</StyledButtonLink>
      </HeaderRight>
    </GlobalHeader>
  );
}

export default Header;
