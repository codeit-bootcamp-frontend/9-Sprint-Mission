import { useEffect, useState } from "react";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Contact from "./Contact";

interface IProduct {
  createdAt: string;
  favoriteCount: number;
  images: string;
  tags: string[];
  price: number;
  description: string;
  name: string;
}

const ProductDetail = () => {
  const { productId } = useParams();

  const [products, setProducts] = useState<IProduct>();
  const [isLoading, setLoading] = useState(false);

  const createdAt = products?.createdAt.split("T")[0];
  
  // 제품정보 가져오기
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://panda-market-api.vercel.app/products/${productId}`
        );

        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("상세페이지 getProduct GET 요청에서 오류 발생", error);
        }
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  return (
    <div className="detailContainer">
      {!isLoading ? (
        <div className="detailInfoBox">
          {products?.images ? (
            <img src={products.images[0]} alt="제품 사진" className="infoImg" />
          ) : (
            <div className="emptyImageBox">제품 이미지</div>
          )}
          <div className="productsInfo">
            <div className="infoInner">
              <div className="infoTitle">
                <div className="titleBox">
                  <h2>{products?.name}</h2>
                  <button>
                    <img src="/icons/itemMenu.png" alt="아이템 메뉴" />
                  </button>
                </div>
                <h3>{products?.price?.toLocaleString("ko-KR")}원</h3>
              </div>
              <div className="infoDescription">
                <h2>상품 소개</h2>
                <p>{products?.description}</p>
              </div>
              <div className="infoTags">
                <h2>상품 태그</h2>
                <ul className="tagList">
                  {products?.tags?.length! > 0 ? (
                    products?.tags.map((tag, i) => (
                      <li key={i} className="tagItem">
                        {tag}
                      </li>
                    ))
                  ) : (
                    <span className="emptyTag">태그 없음</span>
                  )}
                </ul>
              </div>
            </div>
            <div className="authorBox">
              <div className="author">
                <img src="/icons/sessionBtn.png" alt="유저프로필" />
                <div className="authorInfo">
                  <h3>총명한판다</h3>
                  <span>{createdAt}</span>
                </div>
              </div>
              <div className="likeBtnBox">
                <div className="bar"></div>
                <button className="likeBtn">
                  <img src="/icons/detailLike.png" alt="좋아요 버튼" />
                  <span>{products?.favoriteCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
          <p className="loading">제품정보를 가져오고 있습니다.</p>
      )}
      <Contact productId={productId} />
      <Link to="/items" className="backLink">
        <p>목록으로 돌아가기</p>
        <img src="/icons/back.png" alt="돌아가기 링크" />
      </Link>
    </div>
  );
};

export default ProductDetail;
