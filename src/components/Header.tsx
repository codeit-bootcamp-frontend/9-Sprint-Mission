import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../assets/images/logo.svg";
import userIcon from "../assets/images/icon/login.svg";

const NavStyle = styled(NavLink)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #4b5563;

  &.active {
    color: #3692ff;
  }
`;

const Header = () => {
  return (
    <header className="Header">
      <div className="header-wrap">
        <h1 className="logo-wrap">
          <Link to="/">
            <img src={logoImg} alt="판다마켓" />
          </Link>
        </h1>
        <nav className="menu-wrap">
          <ul>
            <li>
              <NavStyle to="/community">자유게시판</NavStyle>
            </li>
            <li>
              <NavStyle to="/items">중고마켓</NavStyle>
            </li>
          </ul>
        </nav>
        <div className="user-wrap">
          <Link to="/login">
            <img src={userIcon} alt="login" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
