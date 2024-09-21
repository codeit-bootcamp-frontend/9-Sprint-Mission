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
import { Products } from "../Types/Types";

const Detailitem = () => {
  const nav = useNavigate();
  const { productId } = useParams() as { productId: string };
  const [items, setItems] = useState<Products | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getDetailItem(productId);
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDetail();
  }, [productId]);

  if (!items) {
    return <div>Loading...</div>;
  }

  const {
    images,
    name,
    price,
    description,
    tags = [],
    createdAt,
    favoriteCount,
  } = items;

  return (
    <div className="Detailitem">
      <div className="container">
        <section className="ItemSection">
          <Image>
            <img src={images} alt={name} />
          </Image>
          <div className="item-info-wrap">
            <div className="item-tit-wrap">
              <Name>{name}</Name>
              <Price>{Number(price).toLocaleString("ko-KR")}원</Price>
            </div>
            <div className="item-txt-wrap">
              <Title>상품 소개</Title>
              <Description>{description}</Description>
              <Title>상품 태그</Title>
              <TagStyle>
                {tags.map((tag: string) => (
                  <TagName key={tag}>{`#${tag}`}</TagName>
                ))}
              </TagStyle>
              <div className="item-Avatar-Favorite">
                <Avatar
                  text="Avatar"
                  userName="총명한 판다"
                  image={AvatarImg}
                  date={createdAt}
                />
                <FavoriteCount favoriteCount={favoriteCount} />
              </div>
            </div>
          </div>
        </section>
        <CommentsSection productId={productId} />

        <BackButton onClick={() => nav(-1)}>
          목록으로 돌아가기
          <img src={BackIcon} alt="Back icon" />
        </BackButton>
      </div>
    </div>
  );
};

export default Detailitem;

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 26px;
  text-align: left;
`;

const Image = styled.div`
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

const Name = styled.h3`
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

const Price = styled.p`
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

const Description = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
  margin-bottom: 3rem;
`;

const BackButton = styled.button`
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
