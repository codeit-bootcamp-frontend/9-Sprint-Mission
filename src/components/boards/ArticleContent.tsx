import styled from "styled-components";
import Image from "next/image";
import Icon from "@/assets/images/icons/profilex1.png";
import { ArticleContentProps } from "@/types/articles";
import { LikeButton } from "@/components/ui/button/LikeButton";

export default function ArticleContent({ info }: ArticleContentProps) {
  const { title, image, writer, content, likeCount, createdAt } = info;

  const formmatedDate = createdAt?.slice(0, 10).replace(/-/g, ".");

  return (
    <Container>
      <InfoSection>
        <Title>{title}</Title>
        <ProfileWrap>
          <ImageWrap>
            <Image src={image || Icon} width={40} height={40} alt="profile" />
          </ImageWrap>
          <NickName>{writer?.nickname || "총명한 판다"}</NickName>
          <CreatedAt>{formmatedDate}</CreatedAt>
          <Divider />
          <LikeButton count={likeCount} />
        </ProfileWrap>
      </InfoSection>
      <ContentSection>{content}</ContentSection>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
`;
const InfoSection = styled.div`
  width: 100%;
  height: 104px;
  border-bottom: 1px solid var(--gray-200);
`;

const Title = styled.h1`
  font-size: 20px;
  color: var(--gray-800);
`;

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;

  & > :nth-child(2) {
    margin-left: 16px;
  }

  & > :nth-child(3) {
    margin-left: 8px;
  }

  & > :nth-child(4) {
    margin-left: 32px;
  }

  & > :last-child {
    margin-left: 32px;
  }
`;

const ImageWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const NickName = styled.span`
  font-size: 14px;
  color: #4b5563;
`;

const CreatedAt = styled.span`
  font-size: 14px;
  color: var(--gray-400);
`;

const Divider = styled.div`
  width: 2px;
  height: 40px;
  border: 1px solid var(--gray-100);
`;

const ContentSection = styled.div`
  margin-top: 24px;
  font-size: 18px;
  color: #1f2937;
`;
