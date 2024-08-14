import icFacebook from '../assets/images/icon/ic_facebook.svg';
import icTwitter from '../assets/images/icon/ic_twitter.svg';
import icInstagram from '../assets/images/icon/ic_instagram.svg';
import icYoutube from '../assets/images/icon/ic_youtube.svg';

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrap">
        <p>©codeit - 2024</p>
        <div className="footer-btn">
          <a href="./privacy.html">Privacy Policy</a>
          <a href="./faq.html">FAQ</a>
        </div>
        <div className="footer-icon">
          <a href="https://www.facebook.com/" target="_blank">
            <img src={icFacebook} alt="facebook" />
          </a>
          <a href="https://x.com/" target="_blank">
            <img src={icTwitter} alt="twitter" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <img src={icInstagram} alt="instagram" />
          </a>
          <a href="https://www.youtube.com/" target="_blank">
            <img src={icYoutube} alt="youtube" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
