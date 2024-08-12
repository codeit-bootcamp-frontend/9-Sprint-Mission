import gnbImg from "../assets/Group 19.png";
import loginImg from "../assets/Frame 2609463.png";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="gnb">
      <div className="gnb-board">
        <h1>
          <Link>
            <img className="gnb-img" src={gnbImg} alt="판다마켓"></img>
          </Link>
        </h1>
        <ul className="gnb-menus">
          <li className="gnb-menu">
            <Link>자유게시판</Link>
          </li>
          <li className="gnb-menu">
            <Link to="/items">중고마켓</Link>
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
