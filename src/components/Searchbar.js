import searchImg from "../assets/search.svg";
import "./Searchbar.css";
function Searchbar({ onChange }) {
  return (
    <div className="product-nav">
      <h2 className="product-title">전체 상품</h2>
      <div className="product-search">
        <img src={searchImg} alt="돋보기" width="24" height="24" />
        <input
          className="product-form-input"
          placeholder="검색할 상품을 입력해주세요"
          type="text"
        />
      </div>
      <button className="product-form-button" type="submit">
        상품 등록하기
      </button>
      <select className="product-form-options" onChange={onChange}>
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
    </div>
  );
}

export default Searchbar;
