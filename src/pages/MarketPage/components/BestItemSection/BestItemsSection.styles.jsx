import styled from "styled-components";

const S = {};

S.Container = styled.div`
  padding-top: 17px;
  padding-bottom: 24px;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

S.Title = styled.h1`
  flex-grow: 1;
  color: #111827;
  font-weight: bold;
  font-size: 20px;
  line-height: normal;
`;

S.CardList = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default S;
