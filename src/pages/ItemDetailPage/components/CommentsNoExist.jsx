import styled from "styled-components";
import emptyComments from "../../../assets/images/emptyComments.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 196px;
  height: 230px;
  margin: 0 auto;
  color: var(--gray-400);
`;

export function CommentsNoExist() {
  return (
    <Container>
      <img src={emptyComments} alt="/" width="196px" height="196px" />
      <span>아직 문의가 없어요.</span>
    </Container>
  );
}
