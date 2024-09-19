import styled from "styled-components";
import usePageSize, { SORT_TYPE } from "../lib/usePageSize";
import useProducts from "../lib/useProducts";
import ItemCard from "./item-card";

// Styled Components
const BestItemsContainer = styled.div`
  padding: 16px 24px 24px;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

const SectionTitle = styled.div`
  color: #111827;
  font-weight: bold;
  font-size: 20px;
  line-height: normal;
  position: relative;
  padding-bottom: 6px;
  min-width: 80px;
`;

const BestItemsCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

function BestItemsSection() {
  const pageSize = usePageSize(SORT_TYPE.favorite);
  const { list } = useProducts(1, pageSize, SORT_TYPE.favorite, "");

  return (
    <BestItemsContainer>
      <SectionTitle>베스트 상품</SectionTitle>
      <BestItemsCardSection>
        {list?.map((item) => (
          <ItemCard key={`best-item-${item.id}`} item={item} />
        ))}
      </BestItemsCardSection>
    </BestItemsContainer>
  );
}

export default BestItemsSection;
