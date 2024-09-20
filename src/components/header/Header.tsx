import LogoutMenu from "./LogoutMenu";
import useToken from "../../hooks/useToken";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const context = useToken();
  
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleOpenMenu = () => {
    setLogoutOpen((prev) => !prev);
  };

  return (
    <header>
      <nav className="navBar">
        <div className="navContents">
          <Link to="/" className="logoBox">
            <img src="/images/logo.png" alt="로고" />
            판다마켓
          </Link>
          <div className="navMenu">
            <NavLink to="/freeBoard" className={({ isActive }) => (isActive ? "active" : "")}>
              자유게시판
            </NavLink>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                isActive || window.location.pathname === "/additem" ? "active" : ""
              }
            >
              중고마켓
            </NavLink>
          </div>
        </div>
        {!context?.session ? (
          <Link to="/signin" className="signin">
            로그인
          </Link>
        ) : (
          <>
            <button type="button" className="navBtn" onClick={handleOpenMenu}>
              <img src="/icons/sessionBtn.png" alt="개인메뉴버튼" />
            </button>
            {logoutOpen && <LogoutMenu />}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
