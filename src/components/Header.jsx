import "../style/index.css";
import Logo from "../images/logo/logo.png";
import { Link } from "react-router-dom";

const categories = [
  { id: "board", name: "자유게시판" },
  { id: "items", name: "중고마켓" },
];

function Header() {
  return (
    <header>
      <div className="hd_wrap">
        <h1 className="logo">
          <Link to={`/`}>
            <img src={Logo} alt="판다마켓" />
            판다마켓
          </Link>
        </h1>
        <nav>
          <ul className="category-menu">
            {categories &&
              categories.map((category) => (
                <li key={category.id} data-cate={category.id}>
                  <Link to={`/${category.id}`} className="category-link">
                    {category.name}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <div className="btn_login">
          <a href="./login.html">로그인</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
