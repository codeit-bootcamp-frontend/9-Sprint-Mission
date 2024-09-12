import styled from "styled-components";
import BestItemsSection from "../../entities/item/ui/best-items";
import AllItemsSection from "../../entities/item/ui/all-items";

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function ItemsPage() {
  return (
    <Wrapper>
      <BestItemsSection />
      <AllItemsSection />
    </Wrapper>
  );
}

export default ItemsPage;
