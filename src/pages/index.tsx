import styles from "@/src/styles/index.module.css";
import Image from "next/image";
import Home_01 from "@/src/assets/home/home_01.png";
import Home_02 from "@/src/assets/home/home_02.png";
import Home_03 from "@/src/assets/home/home_03.png";
import Home_Bottom from "@/src/assets/home/home_bottom.png";
import Home_Top from "@/src/assets/home/home_top.png";
import Contanier from "../components/Layout/Container";

export default function Home() {
  return (
    <>
      <div className={styles["header-container"]}>
        <div className={styles["header-content"]}>
          <Image
            className={styles["header-img"]}
            src={Home_Top}
            width="746"
            height="340"
            alt=""
          />
          <div className={styles["header-content-description"]}>
            <h2 className={styles["header-content-title"]}>
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h2>
            <a className={styles["showin"]} href="./items.html">
              구경하러 가기
            </a>
          </div>
        </div>
      </div>
      <main className={styles["main-sections"]}>
        <section className={styles["main-section"]}>
          <Image
            className={styles["section-img"]}
            src={Home_01}
            width="588"
            height="444"
            alt="인기상품"
          />
          <div className={styles["section-description"]}>
            <span className={styles["sub-title"]}>Hot item</span>
            <h2 className={styles["main-title"]}>
              인기 상품을
              <br />
              확인해 보세요
            </h2>
            <strong className={styles["description"]}>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </strong>
          </div>
        </section>
        <section className={`${styles["main-section"]} ${styles.rtl}`}>
          <Image
            className={styles["section-img"]}
            src={Home_02}
            width="588"
            height="444"
            alt="검색"
          />
          <div className={styles["section-description"]}>
            <span className={styles["sub-title"]}>Search</span>
            <h2 className={styles["main-title"]}>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h2>
            <strong className={styles["description"]}>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </strong>
          </div>
        </section>
        <section className={styles["main-section"]}>
          <Image
            className={styles["section-img"]}
            src={Home_03}
            width="588"
            height="444"
            alt="상품등록"
          />
          <div className={styles["section-description"]}>
            <span className={styles["sub-title"]}>Register</span>
            <h2 className={styles["main-title"]}>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h2>
            <strong className={styles["description"]}>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </strong>
          </div>
        </section>
      </main>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-content"]}>
          <Image
            className={styles["footer-img"]}
            src={Home_Bottom}
            width="746"
            height="397"
            alt=""
          />
          <div className={styles["footer-content-description"]}>
            <h2 className={styles["footer-content-title"]}>
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
