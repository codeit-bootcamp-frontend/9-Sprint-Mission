import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <nav className="navBar">
        <div className="navContents">
          <Link to="/items" className="logoBox">
            <img src="./logo.png" alt="로고" />
            판다마켓
          </Link>
          <div className="navMenu">
            <Link to="/freeBoard">자유게시판</Link>
            <Link to="/items">중고마켓</Link>
          </div>
        </div>
        <button type="button" className="navBtn">
          <img src="./sessionBtn.png" alt="개인메뉴버튼" />
        </button>
      </nav>
    </header>
  )
}

export default Header;