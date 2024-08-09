import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="ft_inner">
        <p className="order-3">©codeit - 2024</p>
        <ul className="order-1">
          <li>
            <a href="./privacy.html">Privacy Policy</a>
          </li>
          <li>
            <a href="./faq.html">FAQ</a>
          </li>
        </ul>
        <ul className="sns order-2">
          <li>
            <a
              href="https://www.facebook.com/?locale=ko_KR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./images/icon/ic_facebook.svg" alt="facebook" />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/?lang=ko"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./images/icon/ic_twitter.svg" alt="twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./images/icon/ic_youtube.svg" alt="youtube" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./images/icon/ic_instagram.svg" alt="instagram" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
