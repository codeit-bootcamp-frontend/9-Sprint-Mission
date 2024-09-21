import { Link } from "react-router-dom";
import icFacebook from "../assets/images/icon/ic_facebook.svg";
import icTwitter from "../assets/images/icon/ic_twitter.svg";
import icInstagram from "../assets/images/icon/ic_instagram.svg";
import icYoutube from "../assets/images/icon/ic_youtube.svg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrap">
        <p>©codeit - 2024</p>
        <div className="footer-btn">
          <Link to="./privacy.html">Privacy Policy</Link>
          <Link to="./faq.html">FAQ</Link>
        </div>
        <div className="footer-icon">
          <Link to="https://www.facebook.com/">
            <img src={icFacebook} alt="facebook" />
          </Link>
          <Link to="https://x.com/">
            <img src={icTwitter} alt="twitter" />
          </Link>
          <Link to="https://www.instagram.com/">
            <img src={icInstagram} alt="instagram" />
          </Link>
          <Link to="https://www.youtube.com/">
            <img src={icYoutube} alt="youtube" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
