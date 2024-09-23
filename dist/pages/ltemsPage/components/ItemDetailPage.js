import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ProductDetails from "./ProductDetails";
import CommentList from "./CommentList";
import { Container } from "../../../styles/Container";
import styled from "styled-components";
import Button from "../../../components/Button";
import arrowImg from "../../../assets/arrow.svg";
import { useNavigate } from "react-router-dom";
const ItemDetailPage = ({ datas, id }) => {
    const nav = useNavigate();
    return (_jsx(_Fragment, { children: _jsxs(StyledProductDetails, { children: [_jsx(ProductDetails, { datas: datas }), _jsx(CommentList, { id: Number(id) }), _jsx(ReturnButtonContainer, { children: _jsxs(ReturnButton, { onClick: () => nav(-1), width: "240", height: "48", radius: "40", children: [_jsx("span", { children: "\uBAA9\uB85D\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30" }), _jsx("img", { src: arrowImg, alt: "", width: "24", height: "24" })] }) })] }) }));
};
export default ItemDetailPage;
const StyledProductDetails = styled(Container) `
  padding: 24px 0 222px;

  @media (max-width: 1200px) {
    padding: 24px 0 243px;
  }

  @media (max-width: 768px) {
    padding: 16px 0 65px;
  }
`;
const ReturnButtonContainer = styled.div `
  display: flex;
  justify-content: center;
`;
const ReturnButton = styled(Button) `
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
