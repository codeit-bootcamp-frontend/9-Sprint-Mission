import ProductForm from "./components/ProductForm";
import styled from "styled-components";

const AddItemPage = () => {
    return (
        <Container>
            <ProductForm />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 24px;

    @media (max-width: 767px) {
        padding: 24px 15px;
    }
`;

export default AddItemPage;
