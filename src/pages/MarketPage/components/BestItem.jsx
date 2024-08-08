import React, { useEffect, useState } from 'react';
import { getItems } from '../../../api/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../MarketPage.css';

const PAGESIZE = 10;

const BestItem = () => {
  const [page, setPage] = useState(1);
  const [bestItems, setBestItems] = useState([]);

  const handleBestDataLoad = async (options) => {
    getItems(options).then((data) => {
      const { list } = data;
      setBestItems(list);
    });
  };

  useEffect(() => {
    handleBestDataLoad({ page, pageSize: PAGESIZE, orderBy: 'favorite', keyword: '' });
  }, []);

  return (
    <div className="Best-Items">
      {bestItems.slice(0, 4).map((item) => (
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
  );
};
export default BestItem;
