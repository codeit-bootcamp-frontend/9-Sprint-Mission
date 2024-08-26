import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductDetailPresenter from './ProductDetail.presenter';
import { getProductDetail, getProductComment } from '../api'; // 상세 정보를 가져오는 API 함수

function ProductDetail() {
  const { id } = useParams(); // URL에서 제품 ID를 가져옴
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    const queryParams = new URLSearchParams(location.search);
    const previousPage = queryParams.get('page') || 1;
    const orderBy = queryParams.get('orderBy') || 'recent';

    // 쿼리 파라미터를 사용하여 이전 페이지로 이동
    navigate(`/items?page=${previousPage}&orderBy=${orderBy}`);
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await getProductDetail(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      }
    };
    const fetchProductComments = async () => {
      try {
        const data = await getProductComment(id);
        setComment(data.list);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      }
    };

    fetchProductComments();
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ProductDetailPresenter
        product={product}
        comment={comment}
        onClick={handleBackClick}
      />
    </>
  );
}

export default ProductDetail;
