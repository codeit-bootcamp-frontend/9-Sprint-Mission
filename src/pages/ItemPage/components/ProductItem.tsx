import heartIcon from "../../../assets/icon/heart.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../../utils/types/types";

interface Props {
    item: Product;
}

const ProductItem = ({ item }: Props) => {
    return (
        <Link to={`/items/${item.id}`}>
            <StyledItem className="item">
                <img
                    className="productImg"
                    src={item.images}
                    alt="상품 이미지"
                />
                <p className="name">{item.name}</p>
                <p className="price">{item.price}</p>
                <div className="favorite">
                    <img className="favoriteIcon" src={heartIcon} alt="하트" />
                    {item.favoriteCount}
                </div>
            </StyledItem>
        </Link>
    );
};

const StyledItem = styled.div`
    font-weight: 500;
    color: var(--gray800);
    display: flex;
    flex-direction: column;
    gap: 10px;

    .productImg {
        width: 100%;
        margin: 0 0 6px;
        aspect-ratio: 1/1;
        object-fit: cover;
    }

    .name {
        font-size: 14px;
    }
    .price {
        font-weight: 700;
        font-size: 16px;
    }

    .favorite {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: var(--gray600);
        gap: 4px;
    }

    .favoriteIcon {
        width: 16px;
    }
`;

export default ProductItem;
