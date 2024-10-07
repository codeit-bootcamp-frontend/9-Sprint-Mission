import styled from "styled-components";
import Image from "next/image";
import noReplyIcon from "@/assets/images/ui/Img_reply_empty.png";

export function ReplyNoExist() {
  return (
    <Container>
      <ImageWrap>
        <Image src={noReplyIcon} width={120} height={120} alt="no Reply" />
      </ImageWrap>
      <span>
        아직 댓글이 없어요,
        <br /> 지금 댓글을 달아보세요!
      </span>
    </Container>
  );
}

const Container = styled.div`
  width: 151px;
  height: 208px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  font-size: 16px;
  color: var(--gray-400);
  text-align: center;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
`;
