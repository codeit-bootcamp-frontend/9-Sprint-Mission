import logoImg from '../assets/images/logo.svg';
import userIcon from '../assets/images/icon/user.svg';

const Header = () => {
  return (
    <div className="header-wrap">
      <h1 className="logo-wrap">
        <a href="#">
          <img src={logoImg} alt="logo" />
        </a>
      </h1>
      <nav className="menu-wrap">
        <ul>
          <li>
            <a href="#">자유게시판</a>
          </li>
          <li>
            <a href="#" className="active">
              중고마켓
            </a>
          </li>
        </ul>
      </nav>
      <div className="user-wrap">
        <a href="#">
          <img src={userIcon} alt="user" />
        </a>
      </div>
    </div>
  );
};

export default Header;
