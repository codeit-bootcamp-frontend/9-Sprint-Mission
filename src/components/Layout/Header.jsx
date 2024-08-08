import React from 'react';
import './Header.css';
import Logo from '../../assets/images/logo/logo.svg';
import Profile from '../../assets/images/icons/ic-profile.png';
const Header = () => {
  return (
    <header>
      <div className="header-left-wrap">
        <a href="/">
          <img src={Logo} alt="판다마켓 홈" width="153" />
        </a>
        <div className="header-menu-wrap">
          <a className="" href="">
            자유게시판
          </a>
          <a className="" href="items.html">
            중고마켓
          </a>
        </div>
      </div>
      <img src={Profile} alt="사용자" width="40" />
    </header>
  );
};
export default Header;
