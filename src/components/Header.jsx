import logoImg from "../img/Property 1=lg.png";
import { NavLink } from "react-router-dom";
import "./App.css";

// 페이지 상단 header 컴포넌트
export function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <NavLink to="/">
          <img
            className="logo"
            src={logoImg}
            alt="판다마켓"
            width="150"
            height="50"
          ></img>
        </NavLink>

        <div className="category">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            자유게시판
          </NavLink>
          <NavLink
            to="/items"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            중고마켓
          </NavLink>
        </div>
        <NavLink to="/">
          <button className="my-profile-btn">
            <div className="blind">마이 프로필</div>
            <div className="my-profile"></div>
          </button>
        </NavLink>
      </div>
    </nav>
  );
}
