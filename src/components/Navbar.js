import React from "react";
import "./Navbar.css";
import logoImg from "../assets/logo.svg";
import proFile from "../assets/profile.svg";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <a className="logo-link" href="/">
            <img src={logoImg} alt="로고" width="153" height="51" />
          </a>

          <div className="nav-link">
            <a className="nav-link-text" href="/">
              자유게시판
            </a>
            <a className="nav-link-text" href="/">
              중고마켓
            </a>
          </div>
        </div>
        <a href="/">
          <img src={proFile} alt="프로필" width="40" height="40" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
