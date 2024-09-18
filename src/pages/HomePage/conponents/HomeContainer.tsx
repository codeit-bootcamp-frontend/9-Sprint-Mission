import styled from "styled-components";

const HomeContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 1100px) {
    max-width: 744px;
  }

  @media (max-width: 744px) {
    max-width: 375px;
  }
`;

export default HomeContainer;
