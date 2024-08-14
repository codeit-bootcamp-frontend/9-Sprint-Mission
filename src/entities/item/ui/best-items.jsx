import { useEffect } from "react";
import usePageSize, { SORT_TYPE } from "../lib/usePageSize";
import useProducts from "../lib/useProducts";
import ItemCard from "./item-card";

function BestItemsSection() {
  const pageSize = usePageSize(SORT_TYPE.favorite);
  const { items } = useProducts(1, pageSize, SORT_TYPE.favorite);

  // window resize 시 데이터 재요청
  useEffect(() => {
    // 아이템 목록을 가져오는 훅이 이미 사용 중이므로, 별도로 호출할 필요 없음
    // 상태를 변경할 수 있는 방법은 useProducts 훅 내에서 useEffect를 통해 관리됨
  }, [pageSize]);

  return (
    <div className="bestItemsContainer">
      <div className="sectionTitle">베스트 상품</div>

      <div className="bestItemsCardSection">
        {items?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestItemsSection;
