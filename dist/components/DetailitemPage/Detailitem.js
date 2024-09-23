import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailItem } from "../../api";
import { useEffect, useState } from "react";
import { TagStyle } from "../AdditemPage/components/Tag";
import { TagName } from "../AdditemPage/components/Tag";
import CommentsSection from "./CommentsSection";
import Avatar from "./components/Avatar";
import FavoriteCount from "./components/FavoriteCount";
import AvatarImg from "../../assets/images/icon/login.svg";
import BackIcon from "../../assets/images/icon/ic_back.svg";
const Detailitem = () => {
    const nav = useNavigate();
    const { productId } = useParams();
    const [items, setItems] = useState(null);
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getDetailItem(productId);
                setItems(data);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDetail();
    }, [productId]);
    if (!items) {
        return _jsx("div", { children: "Loading..." });
    }
    const { images, name, price, description, tags = [], createdAt, favoriteCount, } = items;
    return (_jsx("div", { className: "Detailitem", children: _jsxs("div", { className: "container", children: [_jsxs("section", { className: "ItemSection", children: [_jsx(Image, { children: _jsx("img", { src: images, alt: name }) }), _jsxs("div", { className: "item-info-wrap", children: [_jsxs("div", { className: "item-tit-wrap", children: [_jsx(Name, { children: name }), _jsxs(Price, { children: [Number(price).toLocaleString("ko-KR"), "\uC6D0"] })] }), _jsxs("div", { className: "item-txt-wrap", children: [_jsx(Title, { children: "\uC0C1\uD488 \uC18C\uAC1C" }), _jsx(Description, { children: description }), _jsx(Title, { children: "\uC0C1\uD488 \uD0DC\uADF8" }), _jsx(TagStyle, { children: tags.map((tag) => (_jsx(TagName, { children: `#${tag}` }, tag))) }), _jsxs("div", { className: "item-Avatar-Favorite", children: [_jsx(Avatar, { text: "Avatar", userName: "\uCD1D\uBA85\uD55C \uD310\uB2E4", image: AvatarImg, date: createdAt }), _jsx(FavoriteCount, { favoriteCount: favoriteCount })] })] })] })] }), _jsx(CommentsSection, { productId: productId }), _jsxs(BackButton, { onClick: () => nav(-1), children: ["\uBAA9\uB85D\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30", _jsx("img", { src: BackIcon, alt: "Back icon" })] })] }) }));
};
export default Detailitem;
export const Title = styled.h3 `
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 26px;
  text-align: left;
`;
const Image = styled.div `
  width: 486px;
  height: auto;
  overflow: hidden;
  border-radius: 16px;
  @media ${({ theme }) => theme.tablet} {
    width: 340px;
  }

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;
const Name = styled.h3 `
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  @media ${({ theme }) => theme.tablet} {
    font-size: 2rem;
    @media ${({ theme }) => theme.mobile} {
      font-size: 1.6rem;
    }
  }
`;
const Price = styled.p `
  font-size: 4rem;
  font-weight: 600;
  line-height: 47.73px;
  text-align: left;

  @media ${({ theme }) => theme.tablet} {
    font-size: 3.2rem;
    @media ${({ theme }) => theme.mobile} {
      font-size: 2.4rem;
    }
  }
`;
const Description = styled.p `
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
  margin-bottom: 3rem;
`;
const BackButton = styled.button `
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  padding: 12px 64px;
  background-color: ${({ theme }) => theme.clrBlue};
  color: ${({ theme }) => theme.gray100};
  margin: 5rem auto 0;
  transition: all ease 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.clrBlueHover};
    transition: all ease 0.3s;
  }
`;
