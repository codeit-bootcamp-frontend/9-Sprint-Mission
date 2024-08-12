import React, { useEffect, useState } from 'react';
import { getItems } from '../../../api/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../MarketPage.css';

const PAGESIZE_DEFAULT = 4; // 데스크탑 사이즈 페이지 사이즈
const PAGESIZE_TABLET = 2; // 태블릿 사이즈 페이지 사이즈
const PAGESIZE_MOBILE = 1; // 모바일 사이즈 페이지 사이즈

const BestItem = () => {
  const [page, setPage] = useState(1);
  const [bestItems, setBestItems] = useState([]);
  const [pageSize, setPageSize] = useState(PAGESIZE_DEFAULT);

  // 데이터 로딩 함수
  const handleBestDataLoad = async (options) => {
    try {
      const data = await getItems(options);
      const { list } = data;
      setBestItems(list);
      console.log(list);
    } catch (error) {
      console.error('Failed to fetch best items', error);
    }
  };

  useEffect(() => {
    handleBestDataLoad({ page, pageSize, orderBy: 'favorite', keyword: '' });
  }, [page, pageSize]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        // 데스크탑 사이즈
        setPageSize(PAGESIZE_DEFAULT);
      } else if (window.innerWidth >= 744) {
        // 태블릿 사이즈
        setPageSize(PAGESIZE_TABLET);
      } else {
        // 모바일 사이즈
        setPageSize(PAGESIZE_MOBILE);
      }
    };

    // Initial check
    handleResize();

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // Cleanup 함수
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="Best-Items">
      {bestItems.slice(0, pageSize).map((item) => (
        <div key={item.id} className="Item">
          <img className="Best-Item-Img" src={item.images} alt={item.name} width="282" />
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
