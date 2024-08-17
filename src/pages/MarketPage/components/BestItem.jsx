import React, { useEffect, useState } from 'react';
import { getItems } from '../../../api/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../MarketPage.css';

const PAGESIZE_DEFAULT = 4; // 데스크탑 사이즈 페이지 사이즈
const PAGESIZE_TABLET = 2; // 태블릿 사이즈 페이지 사이즈
const PAGESIZE_MOBILE = 1; // 모바일 사이즈 페이지 사이즈

const BestItem = () => {
  const [bestItems, setBestItems] = useState([]);
  const [pageSize, setPageSize] = useState(PAGESIZE_DEFAULT);

  // 데이터 로딩 함수
  const handleBestDataLoad = async (options) => {
    console.log('handleBestDataLoad 실행');

    try {
      const data = await getItems(options);
      const { list } = data;
      setBestItems(list);
    } catch (error) {
      console.error('Failed to fetch best items', error);
    }
  };

  // handleResize에 의해서 pageSize가 변경되면 데이터를 다시 로드
  // pageSize가 변경되면 useEffect가 실행되고 handleBestDataLoad가 실행되어 데이터를 다시 로드
  useEffect(() => {
    handleBestDataLoad({ pageSize, orderBy: 'favorite', keyword: '' });
  }, [pageSize]);

  useEffect(() => {
    console.log('handleResize 실행');
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

    handleResize();

    // 첫로드시 resize이벤트를 등록하고 handleResize실행
    window.addEventListener('resize', handleResize);

    console.log('창크기', window.innerWidth, 'pagSize변경', pageSize);
    // Cleanup 함수
    return () => window.removeEventListener('resize', handleResize);
  }, [pageSize]);

  return (
    <div className="Best-Items">
      {bestItems.map((item) => (
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
