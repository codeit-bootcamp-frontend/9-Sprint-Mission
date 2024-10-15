import Product from "../../components/Product";

export default function AllProducts({ products }) {
  return (
    <>
      <div className="grid grid-cols-2 Tablet:grid-cols-3 PC:grid-cols-5 grid-rows-2 gap-x-2 gap-y-8 mt-[66px] overflow-hidden">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
