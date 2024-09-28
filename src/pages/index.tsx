import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import heroImage from "@/assets/images/home/hero-image.png";
import bottomBannerImage from "@/assets/images/home/bottom-banner-image.png";
import feature1Image from "@/assets/images/home/feature1-image.png";
import feature2Image from "@/assets/images/home/feature2-image.png";
import feature3Image from "@/assets/images/home/feature3-image.png";
import Feature from "@/components/UI/Feature";
import Button from "@/components/UI/Button";

const Home = () => {
  return (
    <>
      <section
        className={`${styles.banner} ${styles.heroBanner}`}
        style={{ backgroundImage: `url(${heroImage.src})` }}
      >
        <div>
          <h1>
            일상의 모든 물건을 <br />
            거래해 보세요
          </h1>

          <Link href="/items" className="pill-button">
            <Button>구경하러 가기</Button>
          </Link>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <Feature
          image={feature1Image}
          alt="인기 상품"
          featureName="Hot item"
          title="인기 상품을 확인해 보세요"
          description="가장 HOT한 중고거래 물품을 판다마켓에서 확인해 보세요"
        />
        <Feature
          image={feature2Image}
          alt="검색 기능"
          featureName="Search"
          title="구매를 원하는 상품을 검색하세요"
          description="구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"
          direction="row-reverse"
        />
        <Feature
          image={feature3Image}
          alt="판매 상품 등록"
          featureName="Register"
          title="판매를 원하는 상품을 등록하세요"
          description="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
        />
      </section>

      <section
        className={styles.banner}
        style={{ backgroundImage: `url(${bottomBannerImage.src})` }}
      >
        <div>
          <h1>
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </h1>
        </div>
      </section>
    </>
  );
};

export default Home;
