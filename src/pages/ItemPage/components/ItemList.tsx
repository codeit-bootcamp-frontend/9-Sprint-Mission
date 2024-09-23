import { ChangeEvent, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import searchIcon from "../../../assets/icon/search.svg";
import { getProducts } from "../../../utils/api/api";
import { getPageSize } from "../../../utils/functions/getPageSize";
import styled from "styled-components";
import { Product } from "../../../utils/types/types";

const SIZE = {
    pc: 10,
    tablet: 6,
    mobile: 4,
};

const ItemList = () => {
    const [product, setProduct] = useState<Product[]>([]);
    // const [page, setPage] = useState(1); // 페이지 네이션 구현 전까지 미사용
    const [order, setOrder] = useState("recent");
    const [pageSize, setPageSize] = useState(SIZE[getPageSize()]);

    const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setOrder(e.target.value);
    };

    useEffect(() => {
        const getData = async () => {
            let result = await getProducts({
                page: 1,
                pageSize,
                orderBy: order,
            });
            if (!result) return;
            setProduct(result.list);
        };
        getData();
    }, [pageSize, order]);

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
                <h2>전체 상품</h2>
                {pageSize === 4 && (
                    <StyledLink to={"/additem"}>상품 등록하기</StyledLink>
                )}
                <TopNavRight>
                    <SearchInput placeholder="검색할 상품을 입력해주세요" />
                    <SearchIcon src={searchIcon} alt="검색 아이콘" />
                    {pageSize === 4 || (
                        <StyledLink to={"/additem"}>상품 등록하기</StyledLink>
                    )}
                    <StyledSelect
                        onChange={handleOrderChange}
                        defaultValue="recent"
                    >
                        <option value="recent">최신순</option>
                        <option value="favorite">좋아요순</option>
                    </StyledSelect>
                </TopNavRight>
            </TopNav>
            <Items>
                {product.map((item) => {
                    return <ProductItem key={item.id} item={item} />;
                })}
            </Items>
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

const TopNavRight = styled.div`
    display: flex;
    gap: 12px;
    position: relative;

    @media (max-width: 767px) {
        margin-top: 8px;
        flex: 100%;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 12px 23px;
    height: 42px;
    background-color: var(--blue);
    color: var(--gray100);
    border: 0;
    border-radius: 8px;
    font-size: 16px;
    white-space: nowrap;
`;

const StyledSelect = styled.select`
    padding: 12px 20px;
    border: 1px solid var(--gray200);
    border-radius: 12px;
    width: 130px;
`;

const SearchIcon = styled.img`
    position: absolute;
    top: 9px;
    left: 16px;
`;

const SearchInput = styled.input`
    background-color: var(--gray100);
    padding: 9px 20px 9px 44px;
    width: 325px;
    height: 42px;
    font-family: inherit;
    border: 0;
    border-radius: 12px;

    @media (max-width: 1200px) {
        width: 242px;
    }

    @media (max-width: 767px) {
        flex: 100%;
    }
`;

const Items = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 40px 24px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 767px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export default ItemList;
