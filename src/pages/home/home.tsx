import { Link } from "react-router-dom";
import styled from "styled-components";
import HotItem from "../../shared/assets/images/landing/Img_home_01.png";
import SearchItem from "../../shared/assets/images/landing/Img_home_02.png";
import RegisterItem from "../../shared/assets/images/landing/Img_home_03.png";
import TopBannerImage from "../../shared/assets/images/landing/Img_home_top.png";
import BottomBannerImage from "../../shared/assets/images/landing/Img_home_bottom.png";

// Styled Components
const Main = styled.main`
  margin-top: var(--header-height);
`;

const Banner = styled.section<{ $backgroundImage: string }>`
  text-align: center;
  height: 540px;
  background-color: #cfe5ff;
  background-repeat: no-repeat;
  background-position: 80% bottom;
  background-size: 448px 204px;
  background-image: ${(props) => `url(${props.$backgroundImage})`};

  h1 {
    font-weight: 700;
    font-size: 32px;
    line-height: 44.8px;
    padding-top: 48px;
    padding-bottom: 18px;
  }

  @media (min-width: 768px) {
    height: 771px;
    background-size: 744px 340px;

    h1 {
      font-size: 40px;
      line-height: 56px;
      padding-top: 84px;
      padding-bottom: 24px;
    }

    h1 br {
      display: none;
    }
  }

  @media (min-width: 1200px) {
    text-align: left;
    display: flex;
    align-items: center;
    background-position: 80% bottom;
    background-size: 55%;

    h1 {
      padding-top: 0;
      padding-bottom: 32px;
    }

    h1 br {
      display: inline;
    }
  }
`;

const FeaturesWrapper = styled.section`
  padding-top: 51px;

  @media (min-width: 768px) {
    padding-top: 51px;
  }

  @media (min-width: 1200px) {
    padding: 138px 0;
  }
`;

// Feature 컴포넌트에서 data-align prop을 정의합니다.
interface FeatureProps {
  $dataAlign: "left" | "right"; // dataAlign prop의 타입을 정의
}

const Feature = styled.div<FeatureProps>`
  margin-bottom: 64px;
  text-align: "left";

  img {
    width: 100%;
    margin-bottom: 20px;

    @media (min-width: 1200px) {
      width: 50%;
    }
  }

  @media (min-width: 1200px) {
    display: flex;
    align-items: center;
    gap: 5%;
    margin-bottom: 138px;
    flex-direction: ${(props) =>
      props.$dataAlign === "right"
        ? "row-reverse"
        : "row"}; // flex-direction도 props.dataAlign을 사용합니다.
  }
`;

const FeatureContent = styled.div`
  flex: 1;

  .feature-tag {
    color: var(--blue-100);
    font-size: 16px;
    line-height: 22.4px;
    font-weight: 700;
    margin-bottom: 8px;

    @media (min-width: 768px) {
      font-size: 18px;
      line-height: 26px;
    }
  }

  .feature-title {
    font-weight: 700;
    font-size: 24px;
    line-height: 33.6px;

    @media (min-width: 768px) {
      font-size: 32px;
      line-height: 42px;
    }

    @media (min-width: 1200px) {
      font-size: 40px;
      line-height: 56px;
    }
  }

  .feature-description {
    font-weight: 500;
    font-size: 16px;
    line-height: 19.2px;
    margin-top: 20px;

    @media (min-width: 768px) {
      font-size: 18px;
      line-height: 26px;
    }

    @media (min-width: 1200px) {
      font-size: 24px;
      line-height: 28.8px;
      margin-top: 24px;
    }
  }
`;

const BottomBanner = styled(Banner)`
  padding: 121px;

  .wrapper {
    display: block;

    @media (min-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @media (min-width: 1200px) {
      display: block;
    }
  }

  .bottom-title {
    width: 236px;
    height: 90px;
    font-weight: 700;
    font-size: 32px;
    line-height: 44.8px;

    @media (min-width: 768px) {
      width: 295px;
      height: 112px;
      font-size: 40px;
      line-height: 56px;
      text-align: center;
    }

    @media (min-width: 1200px) {
      text-align: left;
    }
  }
`;

function HomePage() {
  return (
    <Main>
      <Banner id="topBanner" $backgroundImage={TopBannerImage}>
        <div className="wrapper">
          <h1 id="bannerTitle">
            일상의 모든 물건을
            <br />
            거래해 보세요
          </h1>
          <Link to="/items" className="button pill-button">
            구경하러 가기
          </Link>
        </div>
      </Banner>
      <FeaturesWrapper id="features" className="wrapper">
        <Feature $dataAlign="left">
          <img src={HotItem} alt="인기상품" />
          <FeatureContent>
            <div className="feature-tag">Hot item</div>
            <div className="feature-title">인기 상품을 확인해 보세요</div>
            <p className="feature-description">
              가장 HOT한 중고거래 물품을 판다마켓에서 확인해 보세요
            </p>
          </FeatureContent>
        </Feature>
        <Feature $dataAlign="right">
          <img src={SearchItem} alt="검색 기능" />
          <FeatureContent>
            <div className="feature-tag">Search</div>
            <div className="feature-title">구매를 원하는 상품을 검색하세요</div>
            <p className="feature-description">
              구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
            </p>
          </FeatureContent>
        </Feature>
        <Feature $dataAlign="left">
          <img src={RegisterItem} alt="판매 상품 등록" />
          <FeatureContent>
            <div className="feature-tag">Register</div>
            <div className="feature-title">판매를 원하는 상품을 등록하세요</div>
            <p className="feature-description">
              어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
            </p>
          </FeatureContent>
        </Feature>
      </FeaturesWrapper>
      <BottomBanner $backgroundImage={BottomBannerImage}>
        <div className="wrapper">
          <div className="bottom-title">
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </div>
        </div>
      </BottomBanner>
    </Main>
  );
}

export default HomePage;
