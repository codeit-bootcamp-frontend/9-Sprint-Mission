import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoggedInAtom, userImageAtom } from "../../shared/store/authAtoms";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../shared/assets/images/logo/logo.svg";
import { useEffect, useState, useMemo } from "react";

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
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
  }
`;

const StyledButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 26px;
  color: white;
  background-color: var(--blue-100);
  padding: 12px 23px;
  border-radius: 8px;
  text-decoration: none;
  width: 128px;
  height: 48px;
  cursor: pointer;

  &:hover {
    background-color: var(--blue-200);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  cursor: pointer;

  a {
    display: block;
    color: var(--gray-600);
    font-weight: bold;
    padding: 10px;
    text-decoration: none;

    &:hover {
      background-color: var(--gray-100);
    }
  }
`;

const getMobileSize = () => window.innerWidth < 768;

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [userImage, setUserImage] = useAtom(userImageAtom);
  const [isMobileSize, setIsMobileSize] = useState(getMobileSize);
  const [dropdownVisible, setDropdownVisible] = useState(false); // 드롭다운 메뉴 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  // sessionStorage에서 userImage를 한 번만 읽도록 useMemo 사용
  const cachedUserImage = useMemo(() => {
    if (isLoggedIn) {
      return sessionStorage.getItem("userImage");
    }
    return null;
  }, [isLoggedIn]); // isLoggedIn이 true일 때만 sessionStorage에서 읽음

  // 캐싱된 userImage를 Jotai 상태에 설정
  useEffect(() => {
    if (cachedUserImage) {
      setUserImage(cachedUserImage); // 세션 스토리지에서 가져온 후 Jotai 상태 업데이트
    }

    setDropdownVisible(false); // 로그인이 완료되면 드롭다운 닫기
  }, [cachedUserImage, setUserImage]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSize(getMobileSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    // 세션 스토리지 초기화
    sessionStorage.clear();

    // Jotai 상태 초기화
    setIsLoggedIn(false);
    setUserImage("");

    // 홈으로 이동
    navigate("/");
  };

  return (
    <GlobalHeader>
      <HeaderLeft>
        <HeaderLogo to="/" aria-label="홈으로 이동">
          {!isMobileSize && <Logo aria-hidden="true" />}
          <LogoTitle>판다마켓</LogoTitle>
        </HeaderLogo>

        {isLoggedIn && (
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
        )}
      </HeaderLeft>

      <HeaderRight>
        {isLoggedIn && userImage ? (
          <>
            <img
              src={userImage}
              alt="사용자 아바타"
              onClick={() => setDropdownVisible(!dropdownVisible)} // 아바타 클릭 시 드롭다운 토글
            />
            {dropdownVisible && (
              <DropdownMenu>
                <a onClick={handleLogout}>로그아웃</a>
              </DropdownMenu>
            )}
          </>
        ) : (
          <StyledButtonLink to="/login">로그인</StyledButtonLink>
        )}
      </HeaderRight>
    </GlobalHeader>
  );
};

export default Header;
