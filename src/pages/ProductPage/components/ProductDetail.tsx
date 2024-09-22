import { useEffect, useState } from "react";
import styled from "styled-components";
import { getProduct } from "../../../utils/api/api";
import { useParams } from "react-router-dom";
import profileIcon from "../../../assets/icon/profile.svg";
import heartIcon from "../../../assets/icon/heart.svg";
import menuIcon from "../../../assets/icon/menuIcon.svg";
import { Product } from "../../../utils/types/types";
import Tags from "../../../components/Tags";

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    // 상품 상세 조회
    useEffect(() => {
        const getData = async () => {
            const data = await getProduct(productId);
            setProduct(data);
            console.log(data);
        };
        getData();
    }, [productId]);

    return (
        <StyledBox>
            <div className="imgBox">
                <img
                    className="productImg"
                    src={product?.images}
                    alt="상품 이미지"
                />
            </div>
            <div className="textBox">
                <div>
                    <p className="name">{product?.name}</p>
                    <button className="itemMenu">
                        <img src={menuIcon} alt="메뉴 아이콘"></img>
                    </button>
                    <p className="price">
                        {product?.price?.toLocaleString("ko-KR")}원
                    </p>
                    <p className="label">상품 소개</p>
                    <p className="description">{product?.description}</p>
                    <p className="label">상품 태그</p>
                    <Tags items={product?.tags || []} />
                </div>
                <div className="bottom">
                    <div className="profile">
                        <img src={profileIcon} alt="프로필 이미지" />
                        <div>
                            <p className="nickname">총명한판다</p>
                            <p className="date">2024. 01. 02</p>
                        </div>
                    </div>
                    <div className="favoriteBox">
                        <button className="favoritButton">
                            <img src={heartIcon} alt="하트 아이콘" />
                            {product?.favoriteCount}
                        </button>
                    </div>
                </div>
            </div>
        </StyledBox>
    );
};

const StyledBox = styled.div`
    display: flex;
    gap: 24px;
    width: 1200px;
    padding: 0 0 40px;
    border-bottom: 1px solid var(--gray200);
    .imgBox {
        width: 40%;
        .productImg {
            width: 100%;
            aspect-ratio: 1/1;
            object-fit: cover;
        }
    }
    .textBox {
        display: flex;
        flex: 1;
        position: relative;
        justify-content: space-between;
        flex-direction: column;
        color: var(--gray600);
        font-size: 16px;
        .name {
            font-size: 24px;
            font-weight: 600;
            color: var(--gray800);
            margin: 0 0 16px;
        }
        .itemMenu {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 24px;
            background-color: var(--white);
            border: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .price {
            font-size: 40px;
            font-weight: 600;
            color: var(--gray800);
            padding: 0 0 16px;
            margin: 0 0 24px;
            border-bottom: 1px solid var(--gray200);
        }
        .label {
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 16px;
        }
        .description {
            margin: 0 0 24px;
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 40px 0 0;
            .profile {
                display: flex;
                align-items: center;
                font-size: 14px;
                gap: 16px;
                img {
                    width: 40px;
                }
                .nickname {
                    font-weight: 500;
                }
                .date {
                    color: var(--gray400);
                }
            }
            .favoritButton {
                display: flex;
                align-items: center;
                font-size: 16px;
                font-weight: 500;
                color: var(--gray500);
                font-family: inherit;
                border: 1px solid var(--gray200);
                background-color: var(--white);
                border-radius: 35px;
                padding: 4px 12px;
                img {
                    width: 32px;
                    margin: 0 4px 0 0;
                }
            }
        }
    }
    @media (max-width: 1200px) {
        width: 100%;
        gap: 16px;

        .textBox {
            .name {
                font-size: 20px;
            }
            .price {
                font-size: 32px;
                margin: 0 0 16px;
            }
            .label {
                font-size: 14px;
            }
        }
    }

    @media (max-width: 767px) {
        flex-direction: column;
        .imgBox {
            width: 100%;
        }
        .textBox {
            .name {
                font-size: 16px;
                margin: 0 0 8px;
            }
            .price {
                font-size: 24px;
            }
            .label {
                font-size: 14px;
                margin: 0 0 8px;
            }
        }
    }
`;

export default ProductDetail;
