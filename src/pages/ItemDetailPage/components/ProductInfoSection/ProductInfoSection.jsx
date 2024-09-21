import profile from "../../../../assets/images/logo/profile.png";
import heart from "../../../../assets/images/icons/ic_heart.svg";
import S from "./ProductInfoSection.styles";

export function ProductInfoSection({ info }) {
  const { name, price, description, images, createdAt, favoriteCount, tags } =
    info;

  const formattedDate = createdAt.split("T")[0].replace(/-/g, ".");
  return (
    <S.Container>
      <S.Preview imageURL={images[0]} />
      <S.InfoWrap>
        <S.Title>
          <div>{name} 팔아요.</div>
          <h1>{price}원</h1>
        </S.Title>
        <S.Description>
          <div>상품 소개 </div>
          <div>{description}</div>
        </S.Description>
        <S.Tags>
          <div>상품 태그</div>
          <S.TagList>
            {tags.map((tag) => (
              <S.Tag>{tag}</S.Tag>
            ))}
          </S.TagList>
        </S.Tags>
        <S.Author>
          <S.Profile>
            <img src={profile} alt="user Profile" />
          </S.Profile>
          <S.AuthorInfo>
            <div>총명한 판다</div>
            <div>{formattedDate}</div>
          </S.AuthorInfo>
          <S.Divider />
          <S.FavoriteCountButton>
            <img src={heart} alt="" width="26px" height="26px" />
            {favoriteCount}
          </S.FavoriteCountButton>
        </S.Author>
      </S.InfoWrap>
    </S.Container>
  );
}
