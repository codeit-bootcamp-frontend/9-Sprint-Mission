import { Link } from "react-router-dom";
import "./reset.css";
import "./Header.css";
import btn_visibility_on from "../assets/btn_visibility_on.png";

const Header = () => {
  return (
    <header className="header-wrap">
      <div className="leftHeader-wrap">
        <h1>
          <Link className="logo-link" to={"/items"}>
            <div className="logo-img"></div>
          </Link>
        </h1>
        <nav className="navbar-wrap">
          <Link className="navbarMenu" to={"/board"}>
            자유게시판
          </Link>
          <Link className="navbarMenu" to={"/usedMarket"}>
            중고마켓
          </Link>
        </nav>
      </div>
      <div className="btn-visibility-on-wrap">
        <img src={btn_visibility_on} width="40" height="40" />
      </div>
    </header>
  );
};

export default Header;
