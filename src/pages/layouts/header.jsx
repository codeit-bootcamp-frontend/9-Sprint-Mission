import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../shared/assets/images/logo/logo.svg";
import Avatar from "../../shared/assets/images/login/default_avatar.png";
import "./header.css";

const getMobileSize = () => {
  if (window.innerWidth < 768) return true;
  else return false;
};

function Header() {
  const [isMobileSize, setIsMobileSize] = useState(getMobileSize);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSize(getMobileSize);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <header className="global-header">
      <div className="header-left">
        <Link to="/" className="header-logo" aria-label="홈으로 이동">
          <div className="logo-image">
            {!isMobileSize && <Logo />}
            <span className="logo-title">판다마켓</span>
          </div>
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink className="header-menu" to="/board">
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink className="header-menu" to="/items">
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <img className="default-avatar" src={Avatar} />
    </header>
  );
}

export default Header;
