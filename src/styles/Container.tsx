import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 696px;
  }

  @media (max-width: 768px) {
    max-width: 344px;
  }
`;
