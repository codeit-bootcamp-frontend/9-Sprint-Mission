import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { getProducts } from "../../../utils/api/api";
import { getPageSize } from "../../../utils/functions/getPageSize";
import styled from "styled-components";
import { Product } from "../../../utils/types/types";

const SIZE = {
    pc: 4,
    tablet: 2,
    mobile: 1,
};

const BestItemList = () => {
    const [product, setProduct] = useState<Product[]>([]);
    const [pageSize, setPageSize] = useState<number>(SIZE[getPageSize()]);

    useEffect(() => {
        const getData = async () => {
            let result = await getProducts({
                page: 1,
                pageSize,
                orderBy: "favorite",
            });
            if (!result) return;
            setProduct(result.list);
        };
        getData();
    }, [pageSize]);

    useEffect(() => {
        const handleResize = () => {
            setPageSize(SIZE[getPageSize()]);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Container>
            <TopNav>
                <h2>베스트 상품</h2>
            </TopNav>
            <BestItems>
                {product.map((item) => {
                    return <ProductItem key={item.id} item={item} />;
                })}
            </BestItems>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 1200px;
    gap: 24px;

    @media (max-width: 1200px) {
        width: 100%;
        padding: 24px;
    }
`;

const TopNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    h2 {
        font-size: 20px;
        color: var(--gray900);
        white-space: nowrap;
    }
`;

const BestItems = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    width: 1200px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
    }

    @media (max-width: 767px) {
        grid-template-columns: repeat(1, 1fr);
        width: 100%;
    }
`;

export default BestItemList;
