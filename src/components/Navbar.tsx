import proFile from "../assets/profile.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";

function Navbar() {
  return (
    <StyledNavBar>
      <NavBarContainer>
        <NavBarContent>
          <Logo />
          <NavLinkContainer>
            <NavLink to="/">자유게시판</NavLink>
            <NavLink to="/">중고마켓</NavLink>
          </NavLinkContainer>
        </NavBarContent>
        <Link to="/">
          <img src={proFile} alt="프로필" width="40" height="40" />
        </Link>
      </NavBarContainer>
    </StyledNavBar>
  );
}

export default Navbar;

const StyledNavBar = styled.nav`
  border-bottom: 1px solid #dfdfdf;
  width: 100%;
  height: 70px;
`;

const NavBarContent = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 200px 9px;
  height: 70px;

  @media (max-width: 1200px) {
    width: 696px;
    margin: 0 auto;
    padding: 10px 0 9px;
  }

  @media (max-width: 768px) {
    width: 344px;
    margin: 0 auto;
    padding: 10px 0 9px;
    gap: 8px;
  }
`;

const NavLinkContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 21px 15px;
`;

const NavLink = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: #4b5563;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
