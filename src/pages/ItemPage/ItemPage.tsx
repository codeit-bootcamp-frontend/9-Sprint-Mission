import BestItemList from "./components/BestItemList";
import ItemList from "./components/ItemList";
import styled from "styled-components";

const ItemPage = () => {
    return (
        <Container>
            <BestItemList />
            <ItemList />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    padding: 24px 0;
`;

export default ItemPage;
