import gnbImg from "../assets/Group 19.png";
import loginImg from "../assets/Frame 2609463.png";
import "./Header.css";

function Header() {
  return (
    <div className="gnb-menu">
      <div className="gnb-board">
        <img className="gnb-img" src={gnbImg} alt="판다마켓"></img>
        <a href="./">자유게시판</a>
        <a href="./items">중고마켓</a>
      </div>
      <div className="login-img-box">
        <img className="login-img" src={loginImg} alt="로그인이미지"></img>
      </div>
    </div>
  );
}

export default Header;
