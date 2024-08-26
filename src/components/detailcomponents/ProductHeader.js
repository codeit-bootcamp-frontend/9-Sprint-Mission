function ProductHeader({ targetProduct, dateChange }) {
  return (
    <div className="header">
      <div className="productsImg">
        <img src={targetProduct.images} alt="상품이미지" />
      </div>
      <div className="productsContentBox">
        <div className="productsContentTitle">
          <p className="productsContentTitle__h">{targetProduct.name}</p>
          <p className="productsContentTitle__p">{targetProduct.price} 원</p>
        </div>
        <div>
          <p className="productsTitle">상품소개</p>
          <p className="productsDescription">{targetProduct.description}</p>
        </div>
        <div>
          <p className="productsTitle">상품태그</p>
          <div className="productsTagBox">
            {targetProduct.tags?.map((item) => {
              return <div className="productsTags">#{item}</div>;
            })}
          </div>
        </div>
        <div className="userBox">
          <div className="userBoxIcon">
            <div>
              <img src="/ic_profile.png" alt="id-icon" width="100%" />
            </div>
            <div className="userBoxId">
              <div className="userBoxId__id"> 총명한 판다 </div>
              <div className="userBoxId__date">
                {dateChange(targetProduct.updatedAt)}
              </div>
            </div>
          </div>
          <div className="userBoxLike">
            <div className="userBoxLike__count">
              <img
                src="/heart.png"
                alt="하트이미지"
                className="userBoxLike__img"
              />
              <div className="userBoxLike__favoriteCount">
                {targetProduct.favoriteCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHeader;
