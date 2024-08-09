import React from "react";
import Logo from "../../shared/assets/images/logo/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./header.css";

function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue-100)" : "black" };
}

function Header() {
  return (
    <header className="globalHeader">
      <div className="headerLeft">
        <Link to="/" className="headerLogo" aria-label="홈으로 이동">
          <Logo />
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink to="/board" style={getLinkStyle}>
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink to="/items" style={getLinkStyle}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <Link to="/login" className="loginLink button">
        로그인
      </Link>
    </header>
  );
}

export default Header;
