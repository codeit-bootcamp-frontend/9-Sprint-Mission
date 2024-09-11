import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../shared/assets/images/logo/logo.svg"; // SVG는 ReactComponent로 임포트
import Avatar from "../../shared/assets/images/login/default_avatar.png"; // PNG는 경로로 임포트
import "./header.css";

const getMobileSize = () => window.innerWidth < 768;

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
  }, []);

  return (
    <header className="global-header">
      <div className="header-left">
        <Link to="/" className="header-logo" aria-label="홈으로 이동">
          <div className="logo-image">
            {!isMobileSize && <img src={Logo} aria-hidden="true" alt="Logo" />}
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

      <div className="header-right">
        {/* PNG 이미지를 <img> 태그로 사용 */}
        <img className="default-avatar" src={Avatar} alt="기본 아바타" />
      </div>
    </header>
  );
}

export default Header;
