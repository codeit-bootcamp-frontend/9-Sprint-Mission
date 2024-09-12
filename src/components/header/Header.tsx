import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import LogoutMenu from "./LogoutMenu";

const Header = () => {
  const [session, setSession] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    const checkToken = localStorage.getItem("accessToken");

    if (checkToken !== null) {
      setSession(true);
    }
  }, []);

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
        {!session ? (
          <Link to="/signin" className="signin">
            로그인
          </Link>
        ) : (
          <>
            <button type="button" className="navBtn" onClick={handleOpenMenu}>
              <img src="/icons/sessionBtn.png" alt="개인메뉴버튼" />
            </button>
            {logoutOpen && <LogoutMenu setSession={setSession} />}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
