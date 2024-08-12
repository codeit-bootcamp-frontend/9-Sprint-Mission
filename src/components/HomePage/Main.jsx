import "../../style/index.css";
import React from "react";
import { Link } from "react-router-dom";
import MainBnr from "../../images/Img_home_top.png";
import Bnr01 from "../../images/Img_home_01.png";
import Bnr02 from "../../images/Img_home_02.png";
import Bnr03 from "../../images/Img_home_03.png";
import BtmBnr from "../../images/Img_home_bottom.png";

function Main() {
  return (
    <main>
      <div className="banner">
        <div className="bnr_inner">
          <div className="banner_txt">
            <p>
              일상의 모든 물건을
              <br />
              거래해 보세요
            </p>
            <div className="btn_visual">
              <Link to={`/items`}>구경하러 가기</Link>
            </div>
          </div>
          <div className="img">
            <img src={MainBnr} alt="판다마켓 메인배너" />
          </div>
        </div>
      </div>
      <div className="wrap_inner">
        <div className="box">
          <div className="img">
            <img src={Bnr01} alt="인기상품 배너" />
          </div>
          <div className="info">
            <span className="badge">Hot item</span>
            <p className="title">
              인기 상품을
              <br />
              확인해 보세요
            </p>
            <p className="box_txt">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
        <div className="box right">
          <div className="info">
            <span className="badge">Search</span>
            <p className="title">
              구매를 원하는
              <br />
              상품을 검색하세요
            </p>
            <p className="box_txt">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <div className="img">
            <img src={Bnr02} alt="구매상품 배너" />
          </div>
        </div>
        <div className="box">
          <div className="img">
            <img src={Bnr03} alt="등록상품 배너" />
          </div>
          <div className="info">
            <span className="badge">Register</span>
            <p className="title">
              판매를 원하는
              <br />
              상품을 등록하세요
            </p>
            <p className="box_txt">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </div>
      <div className="banner">
        <div className="bnr_inner">
          <div className="banner_txt btm_bnr">
            <p>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </p>
          </div>
          <div className="img">
            <img src={BtmBnr} alt="중고거래 배너" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
