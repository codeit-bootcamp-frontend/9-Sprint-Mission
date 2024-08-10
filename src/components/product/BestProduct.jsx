import { useEffect, useState } from 'react';
import { getPandaMarket } from '../../api';
import ItemCard from './ItemCard';

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1200) {
    return 2;
  } else {
    return 4;
  }
};

const BestProduct = () => {
  const [bestItems, setBestItems] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  // 데이터 로드 및 정렬 함수
  const fetchPandaMarket = async () => {
    const products = await getPandaMarket({ pageSize });
    // 좋아요 수를 기준으로 정렬
    const sortedItems = products.list.sort((a, b) => b.favoriteCount - a.favoriteCount);
    setBestItems(sortedItems);
  };

  // pageSize가 변경 시 데이터 로드
  useEffect(() => {
    fetchPandaMarket();
  }, [pageSize]);

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

  return (
    <div id="product-best">
      <h2 className="product-tit">베스트 상품</h2>
      <ul className="product-wrap">
        {bestItems.map(item => (
          <ItemCard item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default BestProduct;
