import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footerContents">©codeit - 2024</div>
      <div className="footerContents">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/faq">FAQ</Link>
      </div>
      <div className="footerContents">
        <Link to="https://www.facebook.com/?locale=ko_KR" target="_blank" rel="noopener noreferrer">
          <img src="/icons/ic_facebook.svg" alt="페이스북 로고" />
        </Link>
        <Link to="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/ic_twitter.svg" alt="트위터 로고" />
        </Link>
        <Link to="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/ic_youtube.svg" alt="유튜브 로고" />
        </Link>
        <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/ic_instagram.svg" alt="인스타그램 로고" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer;