import React from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../api/assets/images/logo/logo.svg';
import Profile from '../../api/assets/images/icons/ic-profile.png';

const ActiveLinkStyle = ({ isActive }) => {
  console.log(isActive);

  return { color: isActive ? 'var(--blue)' : undefined };
};

const Header = () => {
  return (
    <header className="Header">
      <div className="header-left-wrap">
        <Link to="/">
          <img className="logo" src={Logo} alt="판다마켓 홈" width="153" />
        </Link>
        <div className="header-menu-wrap">
          <NavLink to="/community" style={ActiveLinkStyle}>
            자유게시판
          </NavLink>
          <NavLink to="/items" style={ActiveLinkStyle}>
            중고마켓
          </NavLink>
        </div>
      </div>
      <img src={Profile} alt="사용자" width="40" />
    </header>
  );
};
export default Header;
