import { useRouter } from "next/router";
import { LoginButton } from "../ui/button/LoginButton";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../../assets/images/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import profile from "@/assets/images/icons/profilex1.png";

const Header = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const toggleLogoutButton = () => {
    setIsLogoutOpen((prev) => !prev);
  };

  // 로그아웃 기능
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // 토큰 삭제
    setAccessToken(null); // 상태 초기화
    router.push("/");
  };

  // 클라이언트 사이드에서만 localStorage를 접근
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  return (
    <GlobalHeader>
      <HeaderLeft>
        <Link href="/" aria-label="홈으로 이동">
          <Image src={Logo} alt="판다마켓 로고" width="153" />
        </Link>

        <nav>
          <NavList>
            <NavItem>
              <StyledNavLink
                href="/boards"
                isActive={router.pathname === "/boards"}
              >
                자유게시판
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink
                href="/items"
                isActive={
                  router.pathname === "/items" || router.pathname === "/additem"
                }
              >
                중고마켓
              </StyledNavLink>
            </NavItem>
          </NavList>
        </nav>
      </HeaderLeft>
      {accessToken ? (
        <ProfileContainer>
          <ProfileButton onClick={toggleLogoutButton}>
            <Image src={profile} alt="프로필" width={40} height={40} />
          </ProfileButton>

          {isLogoutOpen && (
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          )}
        </ProfileContainer>
      ) : (
        <LoginButton />
      )}
    </GlobalHeader>
  );
};

export default Header;

// 스타일 컴포넌트 정의
const GlobalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 20px;
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
  a:hover {
    color: var(--blue);
  }
`;

const StyledNavLink = styled(Link).attrs<{ isActive?: boolean }>(
  ({ isActive }) => ({
    isActive: isActive,
  })
)<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? "var(--blue)" : "var(--gray-600)")};
  text-decoration: none;
  &:hover {
    color: var(--blue);
  }
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    transform: scale(1.1);
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  right: 0;
  top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 14px 40px;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  color: var(--gray-500);
`;
