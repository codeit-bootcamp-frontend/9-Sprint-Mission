import React, { useEffect, useMemo, useState } from 'react';
import { getItems } from '../../../api/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../MarketPage.css';
import { PagenationBar } from './PagenationBar';

const PAGESIZE_DEFAULT = 10; // 데스크탑 사이즈 기본 페이지 사이즈
const PAGESIZE_TABLET = 6; // 태블릿 사이즈 페이지 사이즈
const PAGESIZE_MOBILE = 4; // 모바일 사이즈 페이지 사이즈

const AllItem = ({ searchKeyword, orderBy }) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(null);

  const QUERY = useMemo(() => ({ page, pageSize, orderBy, keyword: searchKeyword }), [page, pageSize, orderBy, searchKeyword]);

  // 데이터 로딩 함수
  const handleAllDataLoad = async (QUERY) => {
    try {
      const data = await getItems(QUERY);
      const { list, totalCount } = data;
      setItems(list);
      setTotalCount(totalCount);
    } catch (error) {
      console.error('Failed to fetch items', error);
    }
  };

  useEffect(() => {
    if (pageSize !== null) {
      handleAllDataLoad(QUERY);
    }
  }, [pageSize, QUERY]);

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

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => setPage(newPage);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div>
      <div className="All-Items">
        {items.map((item) => (
          <div className="Item" key={item.id}>
            <img className="All-Item-Img" src={item.images} alt={item.name} width="200" />
            <p>{item.name}</p>
            <p>{item.price.toLocaleString()}원</p>
            <p className="Favorite">
              <FavoriteBorderIcon />
              {item.favoriteCount}
            </p>
          </div>
        ))}
      </div>
      <PagenationBar totalPages={totalPages} onPageChange={handlePageChange} />
      {/* <PagenationButton /> */}
    </div>
  );
};

export default AllItem;
