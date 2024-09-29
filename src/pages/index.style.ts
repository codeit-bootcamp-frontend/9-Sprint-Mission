import styled from "styled-components";
import heroImage from "@/assets/images/home/hero-image.png";
import bottomBannerImage from "@/assets/images/home/bottom-banner-image.png";
import { Container, StyledLink } from "@/styles/CommonStyles";

const Banner = styled.section`
  // S.Banner를 직접 사용하지 않고 Banner로 정의
  background-color: #cfe5ff;
  height: 60vh;
  text-align: center;
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 130%;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    height: 90vh;
    background-size: 120%;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    text-align: left;
    height: 540px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-position: 80% bottom;
    background-size: 55%;
  }

  div {
    @media ${({ theme }) => theme.mediaQuery.desktop} {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }
  }

  h1 {
    font-weight: 700;
    font-size: 32px;
    line-height: 44.8px;
    padding-top: 48px;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 40px;
      line-height: 56px;
      padding-top: 84px;
      padding-bottom: 24px;
    }

    @media ${({ theme }) => theme.mediaQuery.desktop} {
      padding-top: 0;
      padding-bottom: 32px;
    }
  }
`;

// HeroBanner 스타일 정의
const HeroBanner = styled(Banner)`
  background-image: url(${heroImage.src});
  h1 br {
    @media ${({ theme }) => theme.mediaQuery.tablet} {
      display: none;
    }

    @media ${({ theme }) => theme.mediaQuery.desktop} {
      display: inline;
    }
  }

  ${StyledLink} {
    padding: 16px 124px;
    font-size: 20px;
  }
`;

// BottomBanner 스타일 정의
const BottomBanner = styled(Banner)`
  background-image: url(${bottomBannerImage.src});
`;

// FeaturesSection 스타일 정의
const FeaturesSection = styled(Container)`
  padding: 51px 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 24px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    padding: 138px 24px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

// S 객체에 할당
const S = {
  Banner,
  HeroBanner,
  BottomBanner,
  FeaturesSection,
};

export default S;
