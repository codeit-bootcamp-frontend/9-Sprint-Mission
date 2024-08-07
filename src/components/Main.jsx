function Main() {
  return (
    <main className="mainClass">
      <section id="topBanner" className="banner">
        <div className="wrapper">
          <h1 id="bannerTitle">
            일상의 모든 물건을
            <br />
            거래해 보세요
          </h1>
          <a className="button pill-button" href="/items">
            구경하러 가기
          </a>
        </div>
      </section>
      <section id="features" className="wrapper">
        <div className="feature">
          <img
            className="imgHome"
            src="images/landing/Img_home_01.png"
            alt="인기상품"
          />
          <div className="feature-content">
            <div className="feature-tag">Hot item</div>
            <div className="feature-title">
              인기 상품을{" "}
              <span className="break-on-desktop">
                <br />
              </span>
              확인해 보세요
            </div>
            <p className="feature-description">
              가장 HOT한 중고거래 물품을
              <br />
              판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>
        <div className="feature">
          <img
            className="imgHome"
            src="images/landing/Img_home_02.png"
            alt="검색 기능"
          />
          <div className="feature-content">
            <div className="feature-tag">Search</div>
            <div className="feature-title">
              구매를 원하는{" "}
              <span className="break-on-desktop">
                <br />
              </span>
              상품을 검색하세요
            </div>
            <p className="feature-description">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>
        <div className="feature">
          <img
            className="imgHome"
            src="images/landing/Img_home_03.png"
            alt="판매 상품 등록"
          />
          <div className="feature-content">
            <div className="feature-tag">Register</div>
            <div className="feature-title">
              판매를 원하는{" "}
              <span className="break-on-desktop">
                <br />
              </span>
              상품을 등록하세요
            </div>
            <p className="feature-description">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>
      <section id="bottomBanner" className="banner">
        <div className="wrapper">
          <div className="bottom-title">
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
