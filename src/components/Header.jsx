import "../assets/styles/Header.css";
import logo from "../assets/images/logo.png";
import userIcon from "../assets/images/userIcon.png";

export default function Header() {
  return (
    <div className="header">
      <a href="#">
        <img className="logo" src={logo} alt="판다마켓" />
      </a>
      <div className="header-category">
        <h1 className="pick1">자유게시판</h1>
        <h1 className="pick2">중고마켓</h1>
      </div>
      <img className="user-icon" src={userIcon} />
    </div>
  );
}
