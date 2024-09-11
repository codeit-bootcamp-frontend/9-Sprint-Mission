function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="copyright">© codeit - 2024</div>
        <div className="footer-menu">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>
        <div className="social-media">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="@images/shared/assets/images/footer/ic_facebook.png"
              alt="Facebook"
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="@images/shared/assets/images/footer/ic_twitter.png"
              alt="Twitter"
            />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="@images/shared/assets/images/footer/ic_youtube.png"
              alt="YouTube"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="@images/shared/assets/images/footer/ic_instagram.png"
              alt="Instagram"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
