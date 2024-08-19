import React from "react";
import "./Header.css";
import logoImg from "../assets/img/panda_logo.png";
import profileImg from "../assets/img/profileImg.png";

export default function Header() {
  return (
    <header id='header'>
      <div className='left'>
        <div className='logo'>
          <img className='logo_img' src={logoImg} alt='로고이미지' />
          <a className='logo_button' href='/'>
            판다마켓
          </a>
        </div>
        <nav>
          <li>
            <a className='link' href='/'>
              자유게시판
            </a>
          </li>
          <li>
            <a className='link' href='/'>
              중고마켓
            </a>
          </li>
        </nav>
      </div>
      <div className='right'>
        <img className='profile' src={profileImg} alt='프로필 사진' />
      </div>
    </header>
  );
}
