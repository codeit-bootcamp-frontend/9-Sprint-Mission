import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getItems } from '../../api/api.js';
import SearchInput from '../../components/SearchInput';
import SelectBox from '../../components/SelectBox';

const PAGESIZE = 10;

const MarketPage = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('recent');
  const [keyword, setKeyword] = useState('');
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);

  const handleAllDataLoad = async (options) => {
    getItems(options).then((data) => {
      const { list, totalCount } = data;
      setItems(list);
      console.log(list, totalCount);
    });
  };

  const handleBestDataLoad = async (options) => {
    getItems(options).then((data) => {
      const { list, totalCount } = data;
      setBestItems(list);
      console.log(list, totalCount);
    });
  };

  const handleProductAdd = () => {
    window.location.href = '/additem.html';
  };

  useEffect(() => {
    handleAllDataLoad({ page, pageSize: PAGESIZE, orderBy, keyword });
    handleBestDataLoad({ page, pageSize: PAGESIZE, orderBy: 'favorite', keyword });
  }, []);

  return (
    <div className="App">
      <div className="Search-Nav">
        <p>베스트 상품</p>
      </div>
      <div className="Best-Items">
        {bestItems.map((item) => (
          <div key={item.id} className="Item">
            <img src={item.images} alt={item.name} width="282" />
            <p>{item.name}</p>
            <p>{item.price.toLocaleString()}원</p>
            <p className="Favorite">
              <FavoriteBorderIcon />
              {item.favoriteCount}
            </p>
          </div>
        ))}
      </div>
      <div className="Search-Nav">
        <p>전체 상품</p>
        <div className="Search-wrap">
          <SearchInput />
          <Button variant="contained" onClick={handleProductAdd}>
            상품 등록하기
          </Button>
          <SelectBox />
        </div>
      </div>
      <div className="Items">
        {items.map((item) => (
          <div key={item.id} className="Item">
            <img src={item.images} alt={item.name} width="200" />
            <p>{item.name}</p>
            <p>{item.price.toLocaleString()}원</p>
            <p className="Favorite">
              <FavoriteBorderIcon />
              {item.favoriteCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPage;
