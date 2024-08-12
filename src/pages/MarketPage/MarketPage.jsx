import { NavLink } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import SelectBox from '../../components/SelectBox';
import './MarketPage.css';
import AllItem from './components/AllItem.jsx';
import BestItem from './components/BestItem.jsx';
import { useState } from 'react';

const MarketPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('recent');

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchKeyword(e.target.value);
  };

  const handleOrderChange = (newOrderBy) => {
    console.log(newOrderBy);
    setOrderBy(newOrderBy);
  };

  return (
    <div className="MarketPage">
      <div className="Search-Nav">
        <p>베스트 상품</p>
      </div>
      <BestItem />
      <div className="Search-Nav">
        <p>전체 상품</p>
        <div className="Search-wrap">
          <SearchInput value={searchKeyword} onChange={handleSearchChange} />
          <NavLink to="/additem">
            <button variant="contained" className="Register-Button">
              상품 등록하기
            </button>
          </NavLink>
          <SelectBox onChange={handleOrderChange} />
        </div>
      </div>
      <AllItem searchKeyword={searchKeyword} orderBy={orderBy} />
    </div>
  );
};

export default MarketPage;
