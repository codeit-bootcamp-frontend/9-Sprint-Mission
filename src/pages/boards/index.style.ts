import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    max-width: 800px;
    padding: 0 24px;
    gap: 24px;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    max-width: 566px;
    padding: 0 16px;
    gap: 24px;
  }
`;

const S = {
  Container,
};

export default S;
