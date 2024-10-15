import favoritIcon from "../../assets/image/favoriteIcon.svg";

// eslint-disable-next-line react/prop-types
export default function AllProducts({ products }) {
  return (
    <>
      <div className="grid grid-cols-2 Tablet:grid-cols-3 PC:grid-cols-5 grid-rows-2 gap-x-2 gap-y-8 mt-[66px] overflow-hidden">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0">
            <img
              key={product.id}
              src={product.images[0]}
              alt={`${product.id} 상품 이미지`}
              className="aspect-[1/1]  mb-4 PC:mb-4 rounded-2xl Mobile:rounded-xl w-full"
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
