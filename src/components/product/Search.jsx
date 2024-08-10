const Search = ({ sortOrder, handleChangeSelect }) => {
  return (
    <div className="product-search">
      <form className="product-search-input">
        <input placeholder="검색할 상품을 입력해주세요" />
        <button type="button" className="search-button"></button>
      </form>
      <form action="./additem">
        <button className="product-button">상품 등록하기</button>
      </form>
      <select className="product-select" name="search" value={sortOrder} onChange={handleChangeSelect}>
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
    </div>
  );
};

export default Search;
