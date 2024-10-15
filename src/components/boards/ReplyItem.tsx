import Image from "next/image";
import profile from "@/assets/images/icons/profilex1.png";
import { styled } from "styled-components";
import { Menu } from "@/components/ui/button/Menu";

const ReplyItem = ({ info }) => {
  const { writer, updatedAt, createdAt, content, id } = info;

  return (
    <Container>
      <span>{content}</span>
      <ProfileWrap>
        <ImageWrap>
          <Image
            src={writer?.image || profile}
            width={32}
            height={32}
            alt="profile image"
          />
        </ImageWrap>
        <div>
          <NickName>{writer?.nickname}</NickName>
          <CreatedAt>{createdAt}</CreatedAt>
        </div>
      </ProfileWrap>
      <Menu />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid var(--gray-100);
  background-color: #fcfcfc;

  > span {
    font-size: 16px;
  }

  > :last-child {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const ProfileWrap = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 8px;

  > div {
    display: flex;
    flex-direction: column;
  }
`;

const ImageWrap = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;

const NickName = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: var(--gray-600);
`;

const CreatedAt = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: var(--gray-400);
`;
export default ReplyItem;
