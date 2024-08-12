import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoIcon from "../../assets/icon/logoIcon.svg";
import logoText from "../../assets/icon/logoText.svg";
import profileIcon from "../../assets/icon/profile.svg";
import "./Header.css";

const setLinkStyle = ({ isActive }) => {
    return isActive ? "selected" : "";
};

const Header = () => {
    return (
        <header>
            <div className="leftMenu">
                <Link className="logo" to="/">
                    <img className="logoIcon" src={logoIcon} alt="로고" />
                    <img className="logoText" src={logoText} alt="로고" />
                </Link>
                <NavLink to="/" className={setLinkStyle}>
                    자유게시판
                </NavLink>
                <NavLink to="/items" className={setLinkStyle}>
                    중고마켓
                </NavLink>
            </div>
            <NavLink to="/">
                <img src={profileIcon} alt="프로필 이미지" />
            </NavLink>
        </header>
    );
};

export default Header;
