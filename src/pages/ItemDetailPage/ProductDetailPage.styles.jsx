import styled from "styled-components";

const S = {};

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  gap: 24px;

  @media (max-width: 745px) {
    width: 696px;
    padding: 0;
  }

  @media (max-width: 377px) {
    width: 344px;
  }
`;

export default S;
