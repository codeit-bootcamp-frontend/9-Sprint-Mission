import Product from "../../components/Product";

export default function BestProducts({ bestProducts }) {
  return (
    <>
      <h3 className="text-xl font-bold">베스트 상품</h3>
      <div className="flex overflow-hidden gap-[10px] PC:gap-6">
        {bestProducts.map((product) => (
          <div
            key={product.id}
            className="w-[calc(100%/1)] Tablet:w-[calc((100%-10px)/2)] PC:w-[calc((100%-72px)/4)]"
          >
            <Product product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
