import styled from "styled-components";

const S = {
  TitleSection: styled.div`
    display: flex;
    justify-content: space-between;
    height: 42px;
  `,

  SearchSection: styled.div`
    display: flex;
    gap: 13px;
    justify-content: space-between;
    height: 42px;
    margin-top: 24px;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      margin-top: 48px;
    }

    @media ${({ theme }) => theme.mediaQuery.mobile} {
      margin-top: 16px;
    }
  `,

  ListSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
  `,

  Title: styled.h1`
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
  `,
};

export default S;
