import favoritIcon from "../../assets/image/favoriteIcon.svg";

// eslint-disable-next-line react/prop-types
export default function BestProducts({ bestProducts }) {
  return (
    <>
      <h3 className="text-xl font-bold">베스트 상품</h3>
      <div className="flex overflow-hidden gap-[10px] PC:gap-6">
        {bestProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[calc(100%/1)] Tablet:w-[calc((100%-10px)/2)] PC:w-[calc((100%-72px)/4)]"
          >
            <img
              key={product.id}
              src={product.images[0]}
              alt="베스트 상품 이미지"
              className="aspect-[1/1] mt-4 mb-[10px] PC:mb-4 rounded-[16px] w-full"
            />
            <div className="flex flex-col gap-[6px] text-gray800">
              <p className="text-md">{product.name}</p>
              <p className="text-lg font-bold">
                {product.price.toLocaleString()}원
              </p>
              <div className="flex flex-row gap-1 items-center">
                <img src={favoritIcon} alt="좋아요 아이콘" />
                <span className="text-xs text-gray-600">
                  {product.favoriteCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
