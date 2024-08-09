import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const setLinkStyle = ({ isActive }) => {
    return isActive ? "selected" : "";
};

const Header = () => {
    return (
        <header>
            <div className="leftMenu">
                <Link to="/">
                    <img
                        src={require("../../assets/icon/logo/logo_S.png")}
                        alt="로고"
                    />
                </Link>
                <NavLink to="/" className={setLinkStyle}>
                    자유게시판
                </NavLink>
                <NavLink to="/items" className={setLinkStyle}>
                    중고마켓
                </NavLink>
            </div>
            <NavLink to="/">
                <img
                    src={require("../../assets/icon/profile/profile_L.png")}
                    alt="프로필 이미지"
                />
            </NavLink>
        </header>
    );
};

export default Header;
