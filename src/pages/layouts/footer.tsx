import styled from "styled-components";
import { Link } from "react-router-dom";
import facebookLogo from "../../shared/assets/images/footer/ic_facebook.png";
import instagramLogo from "../../shared/assets/images/footer/ic_instagram.png";
import twitterLogo from "../../shared/assets/images/footer/ic_twitter.png";
import youtubeLogo from "../../shared/assets/images/footer/ic_youtube.png";

const FooterContainer = styled.footer`
  background-color: var(--gray-900);
  color: var(--gray-400);
  font-size: 16px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 60px;

  /* Tablet */
  @media (min-width: 768px) {
    padding: 32px 104px 108px 104px;
  }

  /* Desktop */
  @media (min-width: 1200px) {
    padding: 32px 200px 108px 200px;
  }
`;

const Copyright = styled.div`
  order: 3;
  flex-basis: 100%;

  /* Tablet */
  @media (min-width: 768px) {
    flex-basis: auto;
    order: 0;
  }
`;

const FooterMenu = styled.div`
  display: flex;
  gap: 30px;
  color: var(--gray-200);
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 12px;
`;

const Footer: React.FC = () => (
  <FooterContainer>
    <Copyright>©codeit - 2024</Copyright>

    <FooterMenu>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/faq">FAQ</Link>
    </FooterMenu>

    <SocialMedia>
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 페이스북"
      >
        <img src={facebookLogo} alt="페이스북" width="20" />
      </a>
      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 트위터"
      >
        <img src={twitterLogo} alt="트위터" width="20" />
      </a>
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 유튜브"
      >
        <img src={youtubeLogo} alt="유튜브" width="20" />
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 인스타그램"
      >
        <img src={instagramLogo} alt="인스타그램" width="20" />
      </a>
    </SocialMedia>
  </FooterContainer>
);

export default Footer;
