import Badge from "../UI/Badge/Badge";
import Image from "next/image";
import Heart from "@/assets/images/icons/ic_heart.svg";
import styled from "styled-components";
import { ArticleProps } from "@/types/articles";

export function BestArticle({ article, onClick }: ArticleProps) {
  const formattedDate: string = article.createdAt
    ?.slice(0, 10)
    .replace(/-/g, ".");

  return (
    <Container onClick={onClick}>
      <Badge />
      <Title>{article.title}</Title>
      <ImageWrap>
        <Image src={article.image} alt="product Image" width={48} height={44} />
      </ImageWrap>
      <InfoWrap>
        <span>{article.writer.nickname}</span>
        <Image src={Heart} width={16} height={16} alt="heart icon" />
        <span>{article.likeCount}</span>
        <span>{formattedDate}</span>
      </InfoWrap>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 384px;
  height: 169px;
  border-radius: 8px;
  background-color: var(--gray-50);

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: transform 0.3s ease; // 부드러운 확대 효과
  }
`;

const Title = styled.div`
  position: absolute;
  left: 24px;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  line-height: 32px;
`;

const ImageWrap = styled.div`
  position: absolute;
  right: 24px;
  width: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  border-radius: 6px;
  background-color: white;
`;

const InfoWrap = styled.div`
  position: absolute;
  bottom: 12px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  font-size: 14px;
  font-weight: 400x;
  color: #6b7280;

  & > span:nth-of-type(1) {
    margin-right: 8px;
  }
  & > span:nth-of-type(2) {
    margin-left: 4px;
  }
  & > span:last-child {
    margin-left: auto;
  }
`;
