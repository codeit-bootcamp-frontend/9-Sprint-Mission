import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getPandaMarket } from "../../../api";
import { useEffect, useState } from "react";
import { Title } from "../Detailitem";
import { TagStyle } from "../../AdditemPage/components/Tag";
import { TagName } from "../../AdditemPage/components/Tag";
import Avatar from "./Avatar";
import FavoriteCount from "./FavoriteCount";

const Image = styled.img`
  width: 486px;
  height: auto;
  border-radius: 16px;
`;

const Name = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  @media ${(props) => props.theme.tablet} {
    font-size: 2rem;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.6rem;
    }
  }
`;

const Price = styled.p`
  font-size: 4rem;
  font-weight: 600;
  line-height: 47.73px;
  text-align: left;

  @media ${(props) => props.theme.tablet} {
    font-size: 3.2rem;
    @media ${(props) => props.theme.mobile} {
      font-size: 2.4rem;
    }
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
  margin-bottom: 3rem;
`;

const ItemSection = () => {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPandaMarket = async () => {
      const products = await getPandaMarket();
      setItems(products.list);
    };

    fetchPandaMarket();
  }, []);

  const item = items.find((product) => Number(product.id) === Number(id));

  const price = item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <section className="ItemSection">
      <Image src={item?.images} alt={item?.name} />
      <div className="item-info-wrap">
        <div className="item-tit-wrap">
          <Name>{item?.name}</Name>
          <Price>{price}원</Price>
        </div>
        <div className="item-txt-wrap">
          <Title>상품 소개</Title>
          <Description>{item?.description}</Description>
          <Title>상품 태그</Title>
          <TagStyle>
            {item?.tags.map((tag) => (
              <TagName key={tag}>{`#${tag}`}</TagName>
            ))}
          </TagStyle>
          <div className="item-Avatar-Favorite">
            <Avatar
              text="Avatar"
              userName="총명한 판다"
              date={item?.createdAt.slice(0, 10)}
            />
            <FavoriteCount favoriteCount={item?.favoriteCount} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemSection;
