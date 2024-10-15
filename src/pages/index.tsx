import styled from "styled-components";
import Footer from "@/components/layout/Footer";
import Feature from "@/components/home/Feature";
import feature1Image from "@/assets/images/home/feature1-image.png";
import feature2Image from "@/assets/images/home/feature2-image.png";
import feature3Image from "@/assets/images/home/feature3-image.png";
import heroImage from "@/assets/images/home/hero-image.png";
import bottomBannerImage from "@/assets/images/home/bottom-banner-image.png";
import { Container, SectionTitle, StyledLink } from "@/styles/CommonStyles";

export default function Home() {
  return (
    <>
      <HeroBanner>
        <div>
          <SectionTitle>
            일상의 모든 물건을 <br />
            거래해 보세요
          </SectionTitle>
          <StyledLink href="/items" $pill>
            구경하러 가기
          </StyledLink>
        </div>
      </HeroBanner>

      <FeaturesSection>
        <Feature
          image={feature1Image.src}
          alt="인기 상품"
          featureName="Hot item"
          title="인기 상품을 확인해 보세요"
          description="가장 HOT한 중고거래 물품을 판다마켓에서 확인해 보세요"
        />
        <Feature
          image={feature2Image.src}
          alt="검색 기능"
          featureName="Search"
          title="구매를 원하는 상품을 검색하세요"
          description="구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"
          direction="row-reverse"
        />
        <Feature
          image={feature3Image.src}
          alt="판매 상품 등록"
          featureName="Register"
          title="판매를 원하는 상품을 등록하세요"
          description="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
        />
      </FeaturesSection>

      <BottomBanner>
        <div>
          <SectionTitle>
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </SectionTitle>
        </div>
      </BottomBanner>

      <Footer />
    </>
  );
}

// 스타일 컴포넌트
const Banner = styled.section`
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

const BottomBanner = styled(Banner)`
  background-image: url(${bottomBannerImage.src});
`;

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
