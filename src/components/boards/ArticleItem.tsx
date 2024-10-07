import styled from "styled-components";
import Image from "next/image";
import profile from "@/assets/images/icons/profilex1.png";
import heart from "@/assets/images/icons/ic_heart.svg";
import { ArticleProps } from "@/types/articles";

export default function ArticleItem({ article, onClick }: ArticleProps) {
  const formattedDate = article?.createdAt.slice(0, 10).replace(/-/g, ".");

  return (
    <Container onClick={onClick}>
      <Title>{article.title}</Title>
      <ImageWrap>
        <Image
          src={article.image || profile}
          width={48}
          height={44}
          alt="product image"
        />
      </ImageWrap>
      <InfoWrap>
        <Image src={profile} width={24} height={24} alt="profile image" />
        <span>{article.writer.nickname}</span>
        <span>{formattedDate}</span>
      </InfoWrap>
      <LikeCountBox>
        <Image src={heart} width={24} height={24} alt="/" />
        <span>{article.likeCount}</span>
      </LikeCountBox>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 138px;
  border-bottom: 1px solid var(--gray-200);
  background-color: #fcfcfc;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    transition: transform 0.3s ease;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  font-size: 20px;
  font-weight: 600;
`;

const ImageWrap = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  border: 1px solid var(--gray-100);
  border-radius: 8px;
  background-color: white;
`;

const InfoWrap = styled.div`
  position: absolute;
  bottom: 14px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  font-size: 14px;
  font-weight: 400;

  & > span:first-child {
    color: #4b5563;
  }

  & > span:nth-of-type(2) {
    color: #9ca3af;
  }
`;

const LikeCountBox = styled.div`
  position: absolute;
  bottom: 14px;
  right: 24px;
  display: flex;
  gap: 8px;
  font-size: 16px;
  font-weight: 400;
  color: #6b7280;
`;
