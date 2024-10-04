// boards 페이지 -> 인기 게시글 목록 -> 인기 게시글 카드

import { ArticleProps } from "@/types/articles";
import Badge from "../UI/Badge/Badge";
import Image from "next/image";
import Heart from "@/assets/images/icons/ic_heart.svg";
import S from "./BestArticle.style";

export function BestArticle({ article, onClick }: ArticleProps) {
  const formattedDate: string = article.createdAt
    ?.slice(0, 10)
    .replace(/-/g, ".");

  return (
    <S.Container onClick={onClick}>
      <Badge />
      <S.Title>{article.title}</S.Title>
      <S.ImageWrap>
        <Image src={article.image} alt="product Image" width={48} height={44} />
      </S.ImageWrap>
      <S.InfoWrap>
        <span>{article.writer.nickname}</span>
        <Image src={Heart} width={16} height={16} alt="heart icon" />
        <span>{article.likeCount}</span>
        <span>{formattedDate}</span>
      </S.InfoWrap>
    </S.Container>
  );
}
