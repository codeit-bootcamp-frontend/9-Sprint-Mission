import Footer from "@/components/Layout/Footer";
import Feature from "@/components/home/Feature";
import feature1Image from "@/assets/images/home/feature1-image.png";
import feature2Image from "@/assets/images/home/feature2-image.png";
import feature3Image from "@/assets/images/home/feature3-image.png";
import { SectionTitle, StyledLink } from "@/styles/CommonStyles";
import S from "./index.style";

export default function Home() {
  return (
    <>
      <S.HeroBanner>
        <div>
          <SectionTitle>
            일상의 모든 물건을 <br />
            거래해 보세요
          </SectionTitle>
          <StyledLink href="/items" $pill>
            구경하러 가기
          </StyledLink>
        </div>
      </S.HeroBanner>

      <S.FeaturesSection>
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
      </S.FeaturesSection>

      <S.BottomBanner>
        <div>
          <SectionTitle>
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </SectionTitle>
        </div>
      </S.BottomBanner>

      <Footer />
    </>
  );
}
