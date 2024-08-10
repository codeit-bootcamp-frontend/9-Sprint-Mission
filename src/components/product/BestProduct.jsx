import { useEffect, useState } from 'react';
import { getPandaMarket } from '../../api';
import ItemCard from './ItemCard';

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 1;
  } else if (width < 1280) {
    // Tablet viewport
    return 2;
  } else {
    // Desktop viewport
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

  useEffect(() => {
    // 페이지 크기 변경 시 pageSize 업데이트
    const handleResize = () => {
      const newPageSize = getPageSize();
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
    };

    window.addEventListener('resize', handleResize);

    // 초기 데이터 로드
    fetchPandaMarket();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 배열로 설정하여 처음 렌더링 시만 호출

  useEffect(() => {
    // pageSize가 변경될 때 데이터 재요청
    fetchPandaMarket();
  }, [pageSize]);

  return (
    <div id="product-best">
      <h2 className="product-tit">베스트 상품</h2>
      <ul className="product-wrap">{bestItems && bestItems.map(item => <ItemCard item={item} key={item.id} />)}</ul>
    </div>
  );
};

export default BestProduct;
