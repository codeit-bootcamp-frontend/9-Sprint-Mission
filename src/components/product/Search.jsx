const Search = ({ handleChangeSelect }) => {
  return (
    <div className="product-search">
      <form className="product-search-input">
        <input placeholder="검색할 상품을 입력해주세요" />
        <button type="button" className="search-button"></button>
      </form>
      <form action="./additem">
        <button className="product-button">상품 등록하기</button>
      </form>
      <select className="product-select" name="search" onChange={handleChangeSelect}>
        <option value="최신순">최신순</option>
        <option value="좋아요순">좋아요순</option>
      </select>
    </div>
  );
};

export default Search;
