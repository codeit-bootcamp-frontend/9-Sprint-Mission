import styled from "styled-components";
import CommentList from "./components/CommentList";
import ProductDetail from "./components/ProductDetail";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/icon/backIcon.svg";

const ProductPage = () => {
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };

    return (
        <Cantainer>
            <ProductDetail />
            <CommentList />
            <button className="backButton" onClick={onBackClick}>
                목록으로 돌아가기
                <img src={backIcon} alt="back 아이콘" />
            </button>
        </Cantainer>
    );
};

const Cantainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    padding: 24px;
    .backButton {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 240px;
        height: 48px;
        border: 0;
        border-radius: 9999px;
        background-color: var(--blue);
        color: var(--gray100);
    }
    @media (max-width: 767px) {
        padding: 16px 15px;
    }
`;

export default ProductPage;
