import React, { useEffect, useState } from 'react';
import { getItems } from '../../../api/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../MarketPage.css';
import { PagenationBar } from './PagenationBar';

const PAGESIZE = 10;

const AllItem = ({ searchKeyword, orderBy }) => {
  const [page, setPage] = useState(1);
  // const [orderBy, setOrderBy] = useState('recent');
  const [keyword, setKeyword] = useState('');
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // 데이터 로딩 함수
  const handleAllDataLoad = async (options) => {
    try {
      const data = await getItems(options);
      const { list, totalCount } = data;
      setItems(list);
      setTotalCount(totalCount);
      console.log(list, totalCount);
    } catch (error) {
      console.error('Failed to fetch items', error);
    }
  };

  useEffect(() => {
    handleAllDataLoad({ page, pageSize: PAGESIZE, orderBy, keyword: searchKeyword });
  }, [page, orderBy, searchKeyword]); // page, orderBy, keyword가 변경될 때마다 데이터 로드

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalCount / PAGESIZE);

  return (
    <div>
      <div className="All-Items">
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
      <PagenationBar page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default AllItem;
