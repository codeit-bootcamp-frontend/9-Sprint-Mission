import styled from "styled-components";
import profile from "../../../assets/images/logo/profile.png";
import heart from "../../../assets/images/icons/ic_heart.svg";

const Container = styled.div`
  display: flex;
  gap: 24px;
  padding-top: 24px;
  max-width: 1200px;
  width: 100%;
  height: 496px;
  margin: 0 auto;

  @media (max-width: 745px) {
    width: 696px;
    height: 484px;
    gap: 16px;
  }

  @media (max-width: 375px) {
    flex-direction: column;
    width: 344px;
    height: 851px;
  }
`;

const Preview = styled.div`
  width: 486px;
  height: 486px;
  border-radius: 16px;
  background-image: ${(props) => `url(${props.imageURL})`};
  background-size: cover;
  background-position: center;

  @media (max-width: 745px) {
    width: 340px;
    height: 340px;
  }
`;

const InfoWrap = styled.div`
  width: 690px;
  display: flex;
  flex-direction: column;

  @media (max-width: 745px) {
    width: 340px;
    height: 484px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  border-bottom: 1px solid var(--gray-100);
  padding-bottom: 16px;

  @media (max-width: 745px) {
    width: 340px;
    height: 82px;

    div {
      font-size: 20px;
    }
    h1 {
      font-size: 32px;
    }
  }

  @media (max-width: 375px) {
    height: 66px;
    gap: 8px;
    div {
      font-size: 16px;
    }
    h1 {
      font-size: 24px;
    }
  }
`;

const Description = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 146px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 16px;
  color: var(--gray-600);

  @media (max-width: 745px) {
    width: 340px;
    height: 188px;
  }
`;

const Tags = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 78px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 16px;
  color: var(--gray-600);

  @media (max-width: 745px) {
    width: 340px;
    height: 68px;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Tag = styled.div`
  padding: 6px 16px;
  border-radius: 26px;
  background-color: var(--gray-100);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #1f2937;
`;

const Author = styled.div`
  margin-top: 62px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 745px) {
    margin-top: 40px;
    width: 340px;
    height: 50px;
  }
`;

const Profile = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-200);
  border-radius: 50%;
`;

const AuthorInfo = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
`;

const Divider = styled.div`
  height: 34px;
  border: 1px solid var(--gray-100);
`;

const FavoriteCountButton = styled.button`
  margin-left: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 87px;
  height: 40px;
  border-radius: 35px;
  padding: 4px 12px;
  border: 1px solid var(--gray-200);
`;

export function InfoSection({ info }) {
  const { name, price, description, images, createdAt, favoriteCount, tags } =
    info;

  const formattedDate = createdAt.split("T")[0].replace(/-/g, ".");
  return (
    <Container>
      <Preview imageURL={images[0]} />
      <InfoWrap>
        <Title>
          <div>{name} 팔아요.</div>
          <h1>{price}원</h1>
        </Title>
        <Description>
          <div>상품 소개 </div>
          <div>{description}</div>
        </Description>
        <Tags>
          <div>상품 태그</div>
          <TagList>
            {tags.map((tag) => (
              <Tag>{tag}</Tag>
            ))}
          </TagList>
        </Tags>
        <Author>
          <Profile>
            <img src={profile} alt="user Profile" />
          </Profile>
          <AuthorInfo>
            <div>총명한 판다</div>
            <div>{formattedDate}</div>
          </AuthorInfo>
          <Divider />
          <FavoriteCountButton>
            <img src={heart} alt="" width="26px" height="26px" />
            {favoriteCount}
          </FavoriteCountButton>
        </Author>
      </InfoWrap>
    </Container>
  );
}
