import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import facebookLogo from "../../assets/images/social/facebook-logo.svg";
import twitterLogo from "../../assets/images/social/twitter-logo.svg";
import youtubeLogo from "../../assets/images/social/youtube-logo.svg";
import instagramLogo from "../../assets/images/social/instagram-logo.svg";

// Footer 컨테이너 스타일
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

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 32px 104px 108px 104px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    padding: 32px 200px 108px 200px;
  }
`;

// 저작권 정보 스타일
const Copyright = styled.div`
  order: 3;
  flex-basis: 100%;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-basis: auto;
    order: 0;
  }
`;

// Footer 메뉴 스타일
const FooterMenu = styled.div`
  display: flex;
  gap: 30px;
  color: var(--gray-200);
`;

// 소셜 미디어 아이콘 스타일
const SocialMedia = styled.div`
  display: flex;
  gap: 12px;
`;

// 스타일링된 Link 컴포넌트
const StyledLink = styled(Link)`
  color: var(--gray-200);
  text-decoration: none;
  &:hover {
    color: var(--white);
  }
`;

const Footer: React.FC = () => (
  <FooterContainer>
    <Copyright>©codeit - 2024</Copyright>

    <FooterMenu>
      {/* passHref 없이 최신 방식으로 Link 사용 */}
      <StyledLink href="/privacy">Privacy Policy</StyledLink>
      <StyledLink href="/faq">FAQ</StyledLink>
    </FooterMenu>

    <SocialMedia>
      {/* 외부 링크는 기존 a 태그를 유지하고, next/image를 사용하여 이미지 최적화 */}
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 페이스북"
      >
        <Image src={facebookLogo} alt="페이스북" width={20} height={20} />
      </a>
      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 트위터"
      >
        <Image src={twitterLogo} alt="트위터" width={20} height={20} />
      </a>
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 유튜브"
      >
        <Image src={youtubeLogo} alt="유튜브" width={20} height={20} />
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 인스타그램"
      >
        <Image src={instagramLogo} alt="인스타그램" width={20} height={20} />
      </a>
    </SocialMedia>
  </FooterContainer>
);

export default Footer;
