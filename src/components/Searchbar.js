function Searchbar({ onChange }) {
  return (
    <div className="product-nav">
      <h2 className="product-title">전체 상품</h2>
      <form className="product-form">
        <input
          className="product-form-input"
          placeholder="🔍 검색할 상품을 입력해주세요"
        />
        <button className="product-form-button">상품 등록하기</button>
        <select className="product-form-options" onChange={onChange}>
          <option value="createdAt">최신순</option>
          <option value="favoriteCount">좋아요순</option>
        </select>
      </form>
    </div>
  );
}

export default Searchbar;
