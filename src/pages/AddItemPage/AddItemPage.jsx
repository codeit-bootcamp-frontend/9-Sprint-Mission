import React from "react";
import ProductForm from "./components/ProductForm";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 24px;

    @media (max-width: 767px) {
        padding: 24px 15px;
    }
`;

const AddItemPage = () => {
    return (
        <Container>
            <ProductForm />
        </Container>
    );
};

export default AddItemPage;
