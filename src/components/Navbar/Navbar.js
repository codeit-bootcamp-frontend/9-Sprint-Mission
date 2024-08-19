import React from "react";
import "./Navbar.css";
import logoImg from "../../assets/판다얼굴.svg";
import logoText from "../../assets/판다마켓.svg";
import proFile from "../../assets/profile.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <img
              className="logo-img"
              src={logoImg}
              alt="로고이미지"
              width="40"
              height="40"
            />
            <img
              className="logo-text"
              src={logoText}
              alt="판다마켓"
              width="103"
              height="35"
            />
          </Link>

          <div className="nav-link">
            <a className="nav-link-text" href="/">
              자유게시판
            </a>
            <a className="nav-link-text" href="/">
              중고마켓
            </a>
          </div>
        </div>
        <a href="/" className="profile">
          <img src={proFile} alt="프로필" width="40" height="40" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
