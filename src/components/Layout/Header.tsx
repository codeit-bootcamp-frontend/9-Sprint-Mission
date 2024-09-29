import { useRouter } from "next/router";
import styled from "styled-components";
import Logo from "../../assets/images/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import profile from "@/assets/images/icons/profilex1.png";

// GlobalHeader 스타일
const GlobalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// HeaderLeft 스타일
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

// NavList 스타일
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

// NavItem 스타일
const NavItem = styled.li`
  a:hover {
    color: var(--blue);
  }
`;

// 스타일링된 Link 컴포넌트
const StyledNavLink = styled(Link).attrs<{ isActive?: boolean }>(
  ({ isActive }) => ({
    // isActive 속성은 styled-components 내에서만 사용하고, DOM으로 전달되지 않도록 필터링
    isActive: isActive,
  })
)<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? "var(--blue)" : "var(--gray-600)")};
  text-decoration: none;
  &:hover {
    color: var(--blue);
  }
`;

// ProfileButton 스타일
const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none; // 기본 테두리 제거
  border-radius: 50%; // 둥근 테두리
  cursor: pointer;
  padding: 4px; // 이미지 주변 여백
  overflow: hidden; // 확대 시 이미지가 버튼 경계를 넘지 않도록 설정
  transition: transform 0.3s ease; // 부드러운 확대 효과

  &:hover {
    transform: scale(1.1); // 호버 시 확대 효과
  }

  &:focus {
    outline: none;
    transform: scale(1.1); // 포커스 시에도 확대 효과
  }
`;

const Header: React.FC = () => {
  const router = useRouter();

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
      <ProfileButton>
        <Image src={profile} alt="프로필" width={40} height={40} />
      </ProfileButton>
    </GlobalHeader>
  );
};

export default Header;
