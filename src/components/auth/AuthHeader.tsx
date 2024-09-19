import { Link, useLocation } from "react-router-dom";
import "./AuthHeader.css";

const AuthHeader = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const footerArr = [
    { href: "https://www.google.com/", imgSrc: "/icons/googleLogo.svg", imgAlt: "구글" },
    { href: "https://www.kakaocorp.com/page/", imgSrc: "/icons/kakaoLogo.svg", imgAlt: "카카오" },
  ];

  return (
    <div className="authContainer">
      <Link to="/" className="authLogoContainer">
        <img src="/images/logo.png" alt="로고" />
        <span>판다마켓</span>
      </Link>
      {children}
      <div className="authFooter">
        <div className="authFooterContents">
          <h2>간편 로그인하기</h2>
          <div className="authFooterLink">
            {footerArr.map((link, i) => (
              <Link key={i} to={link.href} target="_blank" rel="noopener noreferrer"> 
                <img src={link.imgSrc} alt={link.imgAlt} />
              </Link>
            ))}
          </div>
        </div>
        <h3 className="authBottomLink">
          {location.pathname === "/signin" ? "판다마켓이 처음이신가요?" : "이미 회원이신가요?"}
          {location.pathname === "/signin" ? <Link to="/signup">회원가입</Link> : <Link to="/signin">로그인</Link>}
        </h3>
      </div>
    </div>
  )
}

export default AuthHeader;