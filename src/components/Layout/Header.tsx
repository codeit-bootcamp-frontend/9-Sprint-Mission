import Logo from "../../assets/images/logo/logo.svg";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const GlobalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled(Link)`
  margin-right: 16px;

  @media (min-width: 768px) {
    margin-right: 35px;
  }

  @media (min-width: 1280px) {
    margin-right: 47px;
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
  a:hover {
    color: var(--blue);
  }
`;

function getLinkStyle({ isActive }: { isActive: boolean }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

const Header: React.FC = () => {
  // const location = useLocation();

  return (
    <GlobalHeader>
      <HeaderLeft>
        <HeaderLogo href="/" aria-label="홈으로 이동">
          <Image src={Logo} alt="판다마켓 로고" width="153" height="200" />
        </HeaderLogo>

        <nav>
          <NavList>
            <NavItem>
              <Link href="/community">자유게시판</Link>
            </NavItem>
            <NavItem>
              <Link href="/items">중고마켓</Link>
            </NavItem>
          </NavList>
        </nav>
      </HeaderLeft>

      <Link href="/login">로그인</Link>
    </GlobalHeader>
  );
};

export default Header;
