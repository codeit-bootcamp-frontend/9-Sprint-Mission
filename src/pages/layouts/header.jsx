import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoL from "../../shared/assets/images/logo/logo.svg";
import LogoM from "../../shared/assets/images/logo/logo_m.svg";
import Avatar from "../../shared/assets/images/login/default_avatar.png";
import "./header.css";

const getWindowSize = () => {
  if (window.innerWidth < 768) {
    return <LogoM />;
  } else {
    return <LogoL />;
  }
};

function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue-100)" : "black" };
}

function Header() {
  const [logoTag, setLogoTag] = useState(getWindowSize);

  useEffect(() => {
    const handleResize = () => {
      setLogoTag(getWindowSize);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <header className="globalHeader">
      <div className="headerLeft">
        <Link to="/" className="headerLogo" aria-label="홈으로 이동">
          {logoTag}
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink to="/board" style={getLinkStyle}>
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink to="/items" style={getLinkStyle}>
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
