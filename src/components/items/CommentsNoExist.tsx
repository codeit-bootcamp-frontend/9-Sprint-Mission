import styled from "styled-components";
import emptyComments from "../../../../assets/images/emptyComments.png";
import Image from "next/image";

export default function CommentsNoExist() {
  return (
    <Container>
      <Image src={emptyComments} alt="/" width={196} height={196} />
      <span>아직 문의가 없어요.</span>
    </Container>
  );
}

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 196px;
  height: 230px;
  margin: 0 auto;
  color: var(--gray-400);
`;
