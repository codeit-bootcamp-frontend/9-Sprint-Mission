import usePageSize, { SORT_TYPE } from "../lib/usePageSize";
import useProducts from "../lib/useProducts";
import ItemCard from "./item-card";

function BestItemsSection() {
  const pageSize = usePageSize(SORT_TYPE.favorite);
  const { products } = useProducts(1, pageSize, SORT_TYPE.favorite);

  return (
    <div className="bestItemsContainer">
      <div className="sectionTitle">베스트 상품</div>

      <div className="bestItemsCardSection">
        {products?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestItemsSection;
