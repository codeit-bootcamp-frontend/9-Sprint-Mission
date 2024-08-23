import gnbImg from "../assets/Group 19.png";
import loginImg from "../assets/Frame 2609463.png";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

function getLinkStyle({ isActive }) {

  return {
    color: isActive ? "#3692ff" : "#4B5563",
  };
}

function Header() {
  return (
    <div className="gnb">
      <div className="gnb-board">
        <h1>
          
            <img className="gnb-img" src={gnbImg} alt="판다마켓"></img>
          
        </h1>
        <ul className="gnb-menus">
          <li className="gnb-menu">
            <Link>자유게시판</Link>
          </li>
          <li className="gnb-menu">
            <NavLink to="/items" style={getLinkStyle}>
              중고마켓
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="login-img-box">
        <img className="login-img" src={loginImg} alt="로그인이미지"></img>
      </div>
    </div>
  );
}

export default Header;
