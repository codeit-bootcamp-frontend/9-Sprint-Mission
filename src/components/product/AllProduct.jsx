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

  // pageSize와 sortOrder 변경 시 데이터 로드
  useEffect(() => {
    const fetchPandaMarket = async () => {
      const products = await getPandaMarket({ orderBy: sortOrder, pageSize });
      setAllItems(products.list);
    };

    fetchPandaMarket();
  }, [sortOrder, pageSize]);

  // 페이지 크기 변경 시 pageSize 업데이트
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
      window.addEventListener('resize', handleResize);
    };

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 셀렉트 박스 이벤트 핸들러
  const handleChangeSelect = event => {
    const order = event.target.value;
    setSortOrder(order);
  };

  return (
    <div id="product-all">
      <div className="product-search-wrap">
        <h2 className="product-tit">전체 상품</h2>
        <Search handleChangeSelect={handleChangeSelect} />
      </div>
      <ul className="product-wrap">
        {allItems?.map(item => (
          <ItemCard item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default AllProduct;
