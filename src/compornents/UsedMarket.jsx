import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AllProducts from './AllProducts';
import BestProducts from './BestProducts';
import { getProducts } from '../api';
import '../css/UsedMarket.css';

function UsedMarket() {
  const location = useLocation();
  const navigate = useNavigate();

  // URL 쿼리에서 페이지와 정렬 기준 가져오기
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page'), 10) || 1;
  const initialOrderBy = queryParams.get('orderBy') || 'recent';

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [totalPages, setTotalPages] = useState(1);
  const maxPageButtons = 5;

  useEffect(() => {
    const fetchTotalPages = async () => {
      const data = await getProducts(10, currentPage, orderBy);
      setTotalPages(Math.ceil(data.totalCount / 10));
    };

    fetchTotalPages();
  }, [currentPage, orderBy]);

  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/items?page=${pageNumber}&orderBy=${orderBy}`);
  };

  // 정렬 기준 변경 시 URL 업데이트
  const handleOrderByChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
    navigate(`/items?page=1&orderBy=${newOrderBy}`);
  };

  const handleProductClick = (productId) => {
    navigate(`/items/${productId}?page=${currentPage}&orderBy=${orderBy}`);
  };

  useEffect(() => {
    // 초기 로드 시 URL을 상태와 동기화
    navigate(`/items?page=${currentPage}&orderBy=${orderBy}`, {
      replace: true,
    });
  }, [currentPage, orderBy]);

  return (
    <>
      <div className="products-wrap">
        <BestProducts orderBy={orderBy} page={currentPage} />
        <AllProducts
          page={currentPage}
          pageSize={10}
          orderBy={orderBy}
          onOrderByChange={handleOrderByChange} // 콜백 함수 전달
          onProductClick={handleProductClick}
        />
      </div>
      <div className="pagination">
        <button
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {'<'}
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? 'active' : ''}
              disabled={currentPage === page}
            >
              {page}
            </button>
          );
        })}
        <button
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {'>'}
        </button>
      </div>
    </>
  );
}

export default UsedMarket;
