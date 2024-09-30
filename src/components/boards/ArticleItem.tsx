import { ArticleProps } from "@/types/articles";
import Image from "next/image";
import profile from "@/assets/images/icons/profilex1.png";
import heart from "@/assets/images/icons/ic_heart.svg";
import S from "./Article.style";

export default function ArticleItem({ article }: ArticleProps) {
  const formattedDate = article?.createdAt.slice(0, 10).replace(/-/g, ".");

  return (
    <S.Container>
      <S.Title>{article.title}</S.Title>
      <S.ImageWrap>
        <Image
          src={article.image || profile}
          width={48}
          height={44}
          alt="product image"
        />
      </S.ImageWrap>
      <S.InfoWrap>
        <Image src={profile} width={24} height={24} alt="profile image" />
        <span>{article.writer.nickname}</span>
        <span>{formattedDate}</span>
      </S.InfoWrap>
      <S.likeCountBox>
        <Image src={heart} width={24} height={24} alt="/" />
        <span>{article.likeCount}</span>
      </S.likeCountBox>
    </S.Container>
  );
}
