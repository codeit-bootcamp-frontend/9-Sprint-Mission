import { useEffect, useState } from 'react';
import { getPandaMarket } from '../../api';
import Search from './Search';
import ItemCard from './ItemCard';

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1200) {
    return 6;
  } else {
    return 10;
  }
};

const AllProduct = () => {
  const [allItems, setAllItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent');
  const [pageSize, setPageSize] = useState(getPageSize());

  // 데이터 로드 함수
  const fetchPandaMarket = async () => {
    const products = await getPandaMarket({ orderBy: sortOrder, pageSize });
    setAllItems(products.list);
  };

  // pageSize와 sortOrder 변경 시 데이터 로드
  useEffect(() => {
    fetchPandaMarket();
  }, [sortOrder, pageSize]);

  // 페이지 크기 변경 시 pageSize 업데이트
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 정렬 함수
  const sortItems = (items, order) => {
    return [...items].sort((a, b) => {
      if (order === 'favorite') {
        return b.favoriteCount - a.favoriteCount;
      } else if (order === 'recent') {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return 0;
    });
  };

  // 정렬 적용
  const sortedItems = sortItems(allItems, sortOrder);

  // 셀렉트 박스 이벤트 핸들러
  const handleChangeSelect = event => {
    const order = event.target.value;
    setSortOrder(order);
  };

  return (
    <div id="product-all">
      <div className="product-search-wrap">
        <h2 className="product-tit">전체 상품</h2>
        <Search sortOrder={sortOrder} handleChangeSelect={handleChangeSelect} />
      </div>
      <ul className="product-wrap">
        {sortedItems.map(item => (
          <ItemCard item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default AllProduct;
